const { body, validationResult } = require("express-validator");

/**
 * Middleware to handle validation errors.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for user registration/signup.
 */
const validateUserRegistration = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  validateRequest,
];

/**
 * Validation rules for user login.
 */
const validateUserLogin = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty().withMessage("Password is required"),
  validateRequest,
];

/**
 * Validation rules for admin login.
 */
const validateAdminLogin = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty().withMessage("Password is required"),
  validateRequest,
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateAdminLogin,
};
