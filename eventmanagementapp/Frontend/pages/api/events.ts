// events.ts

export interface Event {
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
}

// API base URL
const API_BASE_URL = "http://localhost:5000/api/events";

/**
 * Fetch all events from the backend.
 * @returns {Promise<Event[]>} A promise that resolves to an array of events.
 */
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

/**
 * Fetch a single event by ID from the backend.
 * @param id The ID of the event to fetch.
 * @returns {Promise<Event>} A promise that resolves to the fetched event.
 */
export const fetchEventById = async (id: number): Promise<Event> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch event with ID ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

/**
 * Create a new event.
 * @param event The event data to create.
 * @returns {Promise<Event>} A promise that resolves to the created event.
 */
export const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

/**
 * Update an existing event by ID.
 * @param id The ID of the event to update.
 * @param event The updated event data.
 * @returns {Promise<Event>} A promise that resolves to the updated event.
 */
export const updateEvent = async (
  id: number,
  event: Partial<Omit<Event, "id">>
): Promise<Event> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`Failed to update event with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

/**
 * Delete an event by ID.
 * @param id The ID of the event to delete.
 * @returns {Promise<void>} A promise that resolves when the event is deleted.
 */
export const deleteEvent = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete event with ID ${id}`);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
