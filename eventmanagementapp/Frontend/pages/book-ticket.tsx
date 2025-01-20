// pages/book-ticket.tsx
import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  cost: number;
  venue: string;
  time: string;
  totalTickets: number;
  ticketsSold: number;
}

interface BookingFormProps {
  event: Event;
}

const BookingForm: React.FC<BookingFormProps> = ({ event }) => {
  const [ticketsToBook, setTicketsToBook] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Handle ticket booking
  const handleBooking = () => {
    if (ticketsToBook <= 0 || ticketsToBook + event.ticketsSold > event.totalTickets) {
      alert('Invalid number of tickets selected.');
      return;
    }

    // Update event data with the new ticket sale
    const updatedEvent = { ...event, ticketsSold: event.ticketsSold + ticketsToBook };
    
    // Ideally, this should update the event on your backend (e.g., API call)
    setSuccessMessage(`Successfully booked ${ticketsToBook} ticket(s)!`);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">{event.title}</h3>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">{event.date}</p>

      {/* Ticket Booking Section */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Number of Tickets</label>
        <input
          type="number"
          min="1"
          max={event.totalTickets - event.ticketsSold}
          value={ticketsToBook}
          onChange={(e) => setTicketsToBook(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <p className="text-sm text-gray-500">
          Available: {event.totalTickets - event.ticketsSold}
        </p>
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-6 py-3 rounded mt-4"
      >
        Book Tickets
      </button>

      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

// Sample Event for Booking (This can be fetched from an API)
const sampleEvent: Event = {
  id: 1,
  title: 'Sample Event',
  description: 'This is a sample event for ticket booking.',
  date: '2025-03-15',
  cost: 100,
  venue: 'Sample Venue',
  time: '2:00 PM',
  totalTickets: 100,
  ticketsSold: 0
};

export default function BookTicketPage() {
  return (
    <div className="container mx-auto p-6">
      <BookingForm event={sampleEvent} />
    </div>
  );
}
