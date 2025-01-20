const express = require('express');
const router = express.Router();
const { register, login, adminLogin } = require('../controllers/auth');
const { 
  validateUserRegistration, 
  validateUserLogin, 
  validateAdminLogin 
} = require('../middleware/validation');

// User registration/signup with validation
router.post('/register', validateUserRegistration, register);

// User login with validation
router.post('/login', validateUserLogin, login);

// Admin login with validation
router.post('/admin-login', validateAdminLogin, adminLogin);

module.exports = router;
