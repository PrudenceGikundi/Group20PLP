const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Database connection

// User Registration
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check for existing user
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [
      username,
      email,
      hashedPassword,
      role || 'user',
    ]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [admin] = await db.query('SELECT * FROM users WHERE email = ? AND role = "admin"', [
      email,
    ]);
    if (!admin.length) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin[0].id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
