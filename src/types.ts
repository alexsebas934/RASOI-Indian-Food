export type SpiceLevel = "Mild" | "Medium" | "Hot" | "Sami's Desi Heat";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "starters" | "curries" | "breads" | "bar";
  image: string;
  tags: string[];
  spicy?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatarLetter: string;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  spiceLevel?: SpiceLevel;
  selectedOption?: string;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
