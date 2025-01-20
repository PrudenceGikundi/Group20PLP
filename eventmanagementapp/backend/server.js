const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let events = []; // Temporary in-memory storage for events

// GET all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// POST a new event
app.post('/api/events', (req, res) => {
  const newEvent = { id: events.length + 1, ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// PUT (update) an existing event by ID
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const index = events.findIndex((event) => event.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  events[index] = { ...events[index], ...req.body };
  res.json(events[index]);
});

// DELETE an event by ID
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const index = events.findIndex((event) => event.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const deletedEvent = events.splice(index, 1); // Remove the event from the array
  res.json({ message: 'Event deleted successfully', event: deletedEvent[0] });
});

// Sample route for processing payment
app.post("/api/events/:id/book", async (req, res) => {
  const { eventId } = req.params;
  const { ticketCount, mpesaNumber } = req.body; // Expecting the number of tickets and M-Pesa number
  
  // Find event by id
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).send("Event not found");

  // Check if there are enough tickets
  if (event.ticketCount < ticketCount) {
    return res.status(400).send("Not enough tickets available");
  }

  // Reduce ticket count
  event.ticketCount -= ticketCount;
  await event.save();

  // Process payment (e.g., STK push with M-Pesa)
  // Call external API or handle payment logic here

  return res.status(200).send({
    message: `Payment successful for ${ticketCount} ticket(s).`,
    remainingTickets: event.ticketCount, // Return the remaining ticket count
  });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
