// interface/index.ts
export interface PageRouteProps {
  pageRoute: string;
}

// interface/index.ts
export interface ButtonProps {
  buttonLabel: string;
  buttonSize?: string;
  buttonBackgroundColor?: 'red' | 'blue' | 'orange' | 'green';
  action?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// Venue Interface
export interface Venue {
  id: number;
  name: string;
  location: string;
  image: string;
}

// Media Interface
export interface Media {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Video Interface
export interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
}
// Interface for login form
export interface LoginForm {
  email: string;
  password: string;
}

// Interface for sign-up form
export interface SignUpForm {
  name: string;
  email: string;
  password: string;
}
// export interface Event {
//   id: number;
//   title: string;
//   description?: string; // Optional field
//   date: string; // ISO date string
//   location: string;
//   created_by: number; // User ID of the creator
// }
// export interface Event {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   price: string;
//   created_by?: string;
// }

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  category: string;
  cost: number;
  venue: string;
  time: string;
  ticketCount: number;
  totalTickets: number;  // Total available tickets
  ticketsSold: number;   // Total tickets sold
}



export interface AdminActions {
  addEvent: (event: Event) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  updateEvent: (id: number, updatedEvent: Partial<Event>) => Promise<void>;
}
// In your interface file (e.g., interfaces/index.ts)

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
