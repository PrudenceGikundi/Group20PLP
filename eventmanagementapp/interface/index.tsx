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