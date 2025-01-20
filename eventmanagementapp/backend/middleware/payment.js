module.exports.validatePaymentInput = (req, res, next) => {
  const { phone, amount } = req.body;

  // Validate amount: it should be a positive number
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount. It must be greater than 0." });
  }

  // Validate phone number: it should be in international format
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number. It must be a 10-digit number starting with 0." });
  }

  // Convert the phone number to the international format
  const formattedPhone = convertToInternational(phone);

  if (!formattedPhone) {
    return res.status(400).json({ error: "Invalid phone number format." });
  }

  // Attach the formatted phone number to the request body for further use
  req.body.phone = formattedPhone;

  next(); // Proceed to the next middleware/controller
};

/**
 * Convert local phone number to international format (Kenya: 254).
 * Assumes the phone number is in local format starting with '0'.
 * @param {string} phone - The phone number in local format.
 * @returns {string|null} - The international format phone number or null if invalid.
 */
function convertToInternational(phone) {
  if (phone.startsWith("0")) {
    // Replace the leading '0' with '254' (Kenya's international dialing code)
    return `254${phone.slice(1)}`;
  }
  // If the phone number is already in international format, return as is
  if (/^\d{12}$/.test(phone) && phone.startsWith("254")) {
    return phone; // It's already in international format
  }
  return null; // Return null if phone number is invalid
}
