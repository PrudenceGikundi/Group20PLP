import { useState, useEffect, useRef } from "react";
import { Event } from "@/interface";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTime, setSelectedTime] = useState<string>('Any');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [mpesaNumber, setMpesaNumber] = useState<string>('');
  const [ticketCount, setTicketCount] = useState<number>(1); // To hold the ticket count selected by the user

  // Define the reference for the card (pop-up)
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Dummy categories for illustration (You can replace it with actual categories from your database)
  const categories = ['All', 'Sports', 'Music', 'Workshop'];
  const times = ['Any', 'Morning', 'Afternoon', 'Evening'];

  // Fetch events (update this to get real data from your backend)
  const fetchEvents = async () => {
    const response = await fetch('http://localhost:5000/api/events');
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Search function to filter events by category, time, and title
  const filterEvents = () => {
    return events.filter((event) => {
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesTime =
        selectedTime === 'Any' ||
        (selectedTime === 'Morning' && parseInt(event.time.split(':')[0], 10) < 12) ||
        (selectedTime === 'Afternoon' && parseInt(event.time.split(':')[0], 10) >= 12 && parseInt(event.time.split(':')[0], 10) < 18) ||
        (selectedTime === 'Evening' && parseInt(event.time.split(':')[0], 10) >= 18);

      const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesTime && matchesSearchTerm;
    });
  };

  const handleMpesaPayment = () => {
    if (!mpesaNumber) {
      alert("Please enter your M-Pesa number to proceed.");
      return;
    }

    // Logic to decrease ticket count
    if (selectedEvent) {
      const updatedEvent = { ...selectedEvent, ticketCount: selectedEvent.ticketCount - ticketCount };
      setSelectedEvent(updatedEvent);
    }

    alert(`Payment initiated for event ${selectedEvent?.title} using M-Pesa number: ${mpesaNumber}. You have booked ${ticketCount} ticket(s).`);
  };

  const handleCloseCard = () => {
    setSelectedEvent(null); // This removes the event card from the screen.
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      handleCloseCard();
    }
  };

  return (
    <div className="gradient-bg min-h-screen" onClick={handleClickOutside}>
      <Header />
      <div className="flex flex-col justify-center items-center text-center py-12">
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to EventHub!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop platform for every event you need. Start exploring by navigating to our features below.
        </p>

        {/* Search Bar and Filters */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title..."
            className="p-3 border border-gray-300 rounded w-64"
          />

          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="p-3 border border-gray-300 rounded"
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display filtered events or message when there are no events */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>

          {/* Check if there are events to display */}
          {filterEvents().length === 0 ? (
            <div className="flex justify-center">
              <div className="w-64 p-6 border border-gray-300 rounded-lg shadow-lg bg-white text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">No current events</h3>
                <p className="text-gray-600">There are no events matching your search criteria at this time.</p>
              </div>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${filterEvents().length <= 2 ? 'justify-center' : ''}`}>
              {filterEvents().map((event) => (
                <div
                  key={event.id}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedEvent(event)} // Set the event to show details
                >
                  <div className="flex justify-between items-start border p-4 rounded shadow-md group-hover:bg-gray-100 transition">
                    <div className="w-32 h-32 flex-shrink-0">
                      {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover rounded" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold">{event.title}</h3>
                      <p>{event.description}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.venue}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                      <p className="text-sm text-gray-500">Category: {event.category}</p>
                    </div>
                  </div>

                  {/* Show event details when selected */}
                  {selectedEvent?.id === event.id && (
                    <div ref={cardRef} className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center rounded p-4">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                        <h3 className="text-xl font-semibold mb-4">Book Event: {event.title}</h3>
                        <div className="mb-4">
                          <h4 className="font-semibold">Event Details</h4>
                          <p>{event.description}</p>
                          <p className="text-gray-600">Date: {event.date}</p>
                          <p className="text-gray-600">Time: {event.time}</p>
                          <p className="text-gray-600">Venue: {event.venue}</p>
                        </div>

                        <p className="text-gray-700 mb-4">Enter your M-Pesa number to pay and confirm your booking.</p>
                        <input
                          type="text"
                          value={mpesaNumber}
                          onChange={(e) => setMpesaNumber(e.target.value)}
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
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
