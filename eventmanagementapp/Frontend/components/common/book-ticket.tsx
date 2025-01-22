import { FC } from "react";
import { Event } from "@/interface";  
import { useState } from 'react';

interface BookTicketProps {
  selectedEvent: Event;
  onClose: () => void;
}

const BookTicket: FC<BookTicketProps> = ({ selectedEvent, onClose }) => {
  const [ticketCount, setTicketCount] = useState<number>(1);  // Default to 1 ticket
  const [mpesaNumber, setMpesaNumber] = useState<string>('');

  // Function to handle M-Pesa number validation
  const handleMpesaNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and restrict the length to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      // Ensure the number starts with "07"
      if (value.length === 0 || value.startsWith("07")) {
        setMpesaNumber(value);
      }
    }
  };

  const handleMpesaPayment = () => {
    if (!mpesaNumber) {
      alert("Please enter your M-Pesa number to proceed.");
      return;
    }

    // Ensure M-Pesa number is exactly 10 digits and starts with "07"
    if (mpesaNumber.length !== 10 || !mpesaNumber.startsWith("07")) {
      alert("Please enter a valid M-Pesa number starting with 07 and containing 10 digits.");
      return;
    }

    alert(`Payment initiated for event ${selectedEvent.title} using M-Pesa number: ${mpesaNumber}. You have booked ${ticketCount} ticket(s).`);
    onClose();  // Close the booking form after successful payment
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center rounded p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h3 className="text-xl font-semibold mb-4">Book Event: {selectedEvent.title}</h3>
        <div className="mb-4">
          <h4 className="font-semibold">Event Details</h4>
          <p>{selectedEvent.description}</p>
          <p className="text-gray-600">Date: {selectedEvent.date}</p>
          <p className="text-gray-600">Time: {selectedEvent.time}</p>
          <p className="text-gray-600">Venue: {selectedEvent.venue}</p>
        </div>

        <div className="mb-4 text-gray-600">
          <p>Cost per ticket: KSh {selectedEvent.price}</p>
          <p>Total: KSh {selectedEvent.price * ticketCount}</p>
        </div>

        <p className="text-gray-700 mb-4">Enter your M-Pesa number to pay and confirm your booking.</p>
        <input
          type="text"
          value={mpesaNumber}
          onChange={handleMpesaNumberChange}  // Use the new validation handler
          placeholder="Enter your M-Pesa number"
          className="p-3 border border-gray-300 rounded mb-4 w-full"
        />

        {/* Ticket Quantity Input */}
        <div className="mb-4">
          <label htmlFor="ticketCount" className="block text-sm text-gray-600">Tickets</label>
          <input
            id="ticketCount"
            type="number"
            min="1"
            value={ticketCount}
            onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value)))}
            className="p-3 border border-gray-300 rounded w-full"
          />
        </div>

        <button
          onClick={handleMpesaPayment}
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
        >
          Pay with M-Pesa
        </button>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookTicket;
