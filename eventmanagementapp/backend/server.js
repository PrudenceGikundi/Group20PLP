const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const paymentRoutes = require('./routes/payment'); // Import payment routes
const db = require('./config/db'); // Import database connection

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Test database connection
const testDbConnection = async () => {
  try {
    // Test the connection using async/await
    await db.getConnection(); // This will return a connection
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
};

testDbConnection(); // Call the function to test the connection

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes); 

// M-Pesa callback endpoint
app.post('/api/payments/callback', (req, res) => {
  console.log('Callback received:', req.body);
  res.status(200).send('Callback received successfully');
});


// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
