import { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  cost: number;
  venue: string;
  time: string;
  totalTickets: number;
  bookedTickets: number;
  category: string;
}

export default function Admin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
    cost: 0,
    venue: '',
    time: '',
    totalTickets: 0,
    bookedTickets: 0,
    category: 'Music', // Default category
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [categories] = useState<string[]>(['Music', 'Sports', 'Workshop', 'Seminar']); // Example categories

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const validateForm = (): boolean => {
    const validationErrors: string[] = [];
    if (!newEvent.title) validationErrors.push('Title is required');
    if (!newEvent.description) validationErrors.push('Description is required');
    if (!newEvent.date) validationErrors.push('Date is required');
    if (!newEvent.venue) validationErrors.push('Venue is required');
    if (!newEvent.time) validationErrors.push('Time is required');
    if (newEvent.cost <= 0) validationErrors.push('Cost must be greater than zero');
    if (newEvent.totalTickets <= 0) validationErrors.push('Total Tickets must be greater than zero');
    if (!newEvent.category) validationErrors.push('Category is required');
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newEventData: Omit<Event, 'id'> = {
      ...newEvent,
      imageUrl: imagePreview || '',
    };

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),
      });

      if (!response.ok) throw new Error('Failed to create event');
      const data = await response.json();
      setEvents([data, ...events]); // Use the backend response for the new event with an `id`
      resetForm();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const updateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingEventId !== null) {
      const updatedEventData: Omit<Event, 'id'> = {
        ...newEvent,
        imageUrl: imagePreview || newEvent.imageUrl,
      };

      try {
        const response = await fetch(`http://localhost:5000/api/events/${editingEventId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEventData),
        });

        if (!response.ok) throw new Error('Failed to update event');
        const data = await response.json();
        setEvents(
          events.map((event) =>
            event.id === editingEventId ? { ...data } : event
          )
        );
        resetForm();
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Remove the event from the state
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete the event, please try again later.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setNewEvent({ ...newEvent, imageUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEventId(event.id);
    const { id, ...rest } = event; // Exclude `id` for the editable form
    setNewEvent(rest);
    setImagePreview(event.imageUrl || null);
    setShowForm(true);
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      description: '',
      date: '',
      imageUrl: '',
      cost: 0,
      venue: '',
      time: '',
      totalTickets: 0,
      bookedTickets: 0,
      category: 'Music', // Default value
    });
    setImagePreview(null);
    setShowForm(false);
    setEditingEventId(null);
    setErrors([]);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-pink-400 to-gray-600 text-pink-200">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management</h1>

      <button
        onClick={() => setShowForm(true)}
        className="absolute top-6 right-6 bg-pink-400 text-white px-6 py-3 rounded-full shadow-md"
      >
        Add Event
      </button>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">All Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="flex justify-between items-start border p-4 rounded shadow-md bg-gray-600">
              <div className="w-32 h-32 flex-shrink-0">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover rounded" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.description}</p>
                <p className="text-sm text-gray-400">{event.date}</p>
                <p className="text-sm text-gray-400">{event.venue}</p>
                <p className="text-sm text-gray-400">{event.time}</p>
                <p className="text-sm text-gray-400">Cost: ${event.cost}</p>
                <p className="text-sm text-gray-400">Category: {event.category}</p>
                <p className="text-sm text-gray-400">
                  Tickets: {event.bookedTickets}/{event.totalTickets} booked
                </p>
                <p className="text-sm text-gray-400">
                  Remaining Tickets: {event.totalTickets - event.bookedTickets}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-pink-200 text-gray-600 p-8 rounded shadow-lg w-full max-w-3xl h-auto overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">{editingEventId ? 'Edit Event' : 'Create Event'}</h2>
            <form onSubmit={editingEventId ? updateEvent : createEvent} className="space-y-6">
              <div className="flex flex-col">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="border rounded p-2"
                  placeholder="Event Title"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="border rounded p-2"
                  placeholder="Event Description"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="border rounded p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="border rounded p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Venue</label>
                <input
                  type="text"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  className="border rounded p-2"
                  placeholder="Event Venue"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Cost</label>
                <input
                  type="number"
                  value={newEvent.cost}
                  onChange={(e) => setNewEvent({ ...newEvent, cost: +e.target.value })}
                  className="border rounded p-2"
                  placeholder="Event Cost"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Total Tickets</label>
                <input
                  type="number"
                  value={newEvent.totalTickets}
                  onChange={(e) => setNewEvent({ ...newEvent, totalTickets: +e.target.value })}
                  className="border rounded p-2"
                  placeholder="Total Tickets"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="border rounded p-2"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border rounded p-2"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 h-24 object-cover rounded" />
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                  {editingEventId ? 'Update' : 'Create'} Event
                </button>
              </div>
              {errors.length > 0 && (
                <div className="mt-4 text-red-500">
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
