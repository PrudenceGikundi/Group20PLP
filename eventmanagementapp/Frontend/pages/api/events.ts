// // pages/api/events.ts
// import { NextApiRequest, NextApiResponse } from 'next';

// // Dummy database for events (replace with actual DB interaction)
// let events = [
//   { id: 1, title: 'Tech Conference', description: 'A conference for tech enthusiasts', date: '2025-03-25' },
//   // Add other events here
// ];

// // Helper function to simulate DB interaction
// const updateDatabase = (events: any[]) => {
//   // Here integrate with your actual database (e.g., MongoDB, MySQL, etc.)
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'GET':
//       // Fetch events from the database
//       res.status(200).json(events);
//       break;

//     case 'POST':
//       // Add an event (Admin only)
//       const { title, description, date } = req.body;
//       const newEvent = { id: events.length + 1, title, description, date };
//       events.push(newEvent);
//       updateDatabase(events);
//       res.status(201).json(newEvent);
//       break;

//     case 'PUT':
//       // Update an event (Admin only)
//       const { id, updatedTitle, updatedDescription, updatedDate } = req.body;
//       const eventIndex = events.findIndex((event) => event.id === id);
//       if (eventIndex > -1) {
//         events[eventIndex] = {
//           ...events[eventIndex],
//           title: updatedTitle,
//           description: updatedDescription,
//           date: updatedDate,
//         };
//         updateDatabase(events);
//         res.status(200).json(events[eventIndex]);
//       } else {
//         res.status(404).json({ error: 'Event not found' });
//       }
//       break;

//     case 'DELETE':
//       // Delete an event (Admin only)
//       const eventIdToDelete = parseInt(req.query.id as string);
//       events = events.filter((event) => event.id !== eventIdToDelete);
//       updateDatabase(events);
//       res.status(204).end();
//       break;

//     default:
//       res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
