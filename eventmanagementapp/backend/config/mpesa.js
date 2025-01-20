const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Load environment variables
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const BASE_URL = "https://sandbox.safaricom.co.ke"; // Change to live URL in production

/**
 * Function to get an access token from M-Pesa API
 */
async function getAccessToken() {
  const url = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
  const auth =
    "Basic " +
    Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: { Authorization: auth },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error.message);
    throw new Error("Unable to get M-Pesa access token.");
  }
}

module.exports = {
  getAccessToken,
  BASE_URL,
};
