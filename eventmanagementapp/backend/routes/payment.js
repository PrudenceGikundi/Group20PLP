const express = require("express");
const router = express.Router();
const { processPayment, handleCallback } = require("../controllers/payment");
const { validatePaymentInput } = require("../middleware/payment");

// Process payment route
router.post("/process", validatePaymentInput, processPayment);

// Callback route for M-Pesa
router.post("/callback", handleCallback);

module.exports = router;
