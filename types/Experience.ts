import { UUID } from "crypto";
import { User } from "./User";

export interface Experience {
  experience_id: UUID;
  title: string;
  description: string;
  location: Location;
  creator: User;
  average_rating: number;
  number_of_ratings: number;
  date_posted: Date;
  tags: UUID[];
  price?: "free" | "cheap" | "moderate" | "expensive";
  start_time?: string; // Format: "HH:mm:ss" or "HH:mm"
  end_time?: string;   // Format: "HH:mm:ss" or "HH:mm"
  date?: Date;
}
