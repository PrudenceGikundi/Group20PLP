const axios = require("axios");
const moment = require("moment");
const { getAccessToken, BASE_URL } = require("../config/mpesa");

const BUSINESS_SHORTCODE = process.env.BUSINESS_SHORTCODE; 
const PASSKEY = process.env.PASSKEY; 

/**
 * Process payment using M-Pesa STK Push
 */
exports.processPayment = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const accessToken = await getAccessToken();
    console.log("Access token:", accessToken);

    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(`${BUSINESS_SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");
    
    console.log({BusinessShortCode: BUSINESS_SHORTCODE,
  Password: password,
  Timestamp: timestamp,
  TransactionType: "CustomerPayBillOnline",
  Amount: amount,
  PartyA: phone,
  PartyB: BUSINESS_SHORTCODE,
  PhoneNumber: phone,
  CallBackURL: `${process.env.CALLBACK_URL}/api/payments/callback`,
  AccountReference: process.env.MPESA_ACCOUNT_REFERENCE || "TestReference",
  TransactionDesc: "Payment for Event",
   });

    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: BUSINESS_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: BUSINESS_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${process.env.CALLBACK_URL}/api/payments/callback`,
        AccountReference: process.env.MPESA_ACCOUNT_REFERENCE || "TestReference",
        TransactionDesc: "Payment for Event",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.status(200).json({
      message: "Payment request sent. Await M-Pesa confirmation.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: "Failed to process payment.", details: error.message });
  }
};

/**
 * Handle M-Pesa callback
 */
exports.handleCallback = (req, res) => {
  const callbackData = req.body;

  console.log("M-Pesa callback received:", callbackData);

  // Log or save callback data to the database
  // You can update payment status here

  res.status(200).send("Callback received successfully.");
};
