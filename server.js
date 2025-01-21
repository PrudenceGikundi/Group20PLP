const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/eventsDB', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  cost: { type: Number, required: true },
  venue: { type: String, required: true },
  time: { type: String, required: true },
  category: { type: String, required: true }, // Added category to the schema
  totalTickets: { type: Number, required: true },
  bookedTickets: { type: Number, default: 0 },
});
const Event = mongoose.model('Event', eventSchema);

// Authentication token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Authorization middleware (role-based access control)
const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
  }
  next();
};

// Routes

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const validRoles = ['admin', 'user'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: role || 'user' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// Get all events with filters (category, time, title)
app.get('/api/events', authenticateToken, async (req, res) => {
  try {
    // Extract query parameters
    const { category, time, title } = req.query;

    // Build filter object based on query parameters
    const filter = {};

    // Filter by category
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Filter by time (optional: expand to handle more sophisticated time filtering)
    if (time && time !== 'Any') {
      filter.time = time;
    }

    // Filter by title (case-insensitive search)
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // case-insensitive search
    }

    // Fetch filtered events from the database
    const events = await Event.find(filter);

    // Return filtered events
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err });
  }
});

// Get single event by ID
app.get('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err });
  }
});

// Create a new event (admin only)
app.post('/api/events', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error creating event', error: err });
  }
});

// Update an event (admin only)
app.put('/api/events/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating event', error: err });
  }
});

// Delete an event (admin only)
app.delete('/api/events/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Error deleting event', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
