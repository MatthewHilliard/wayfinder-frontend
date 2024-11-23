import { UUID } from "crypto";
import { User } from "./User";
import { Tag } from "./Tag";
import { Location } from "./Location";

export interface Experience {
  experience_id: UUID;
  title: string;
  description: string;
  location: UUID;
  location_info: Location; 
  creator: User;
  average_rating: number;
  number_of_ratings: number;
  date_posted: Date;
  tags: Tag[];
  image_url?: string;
  price?: "free" | "cheap" | "moderate" | "expensive";
  start_time?: string; // Format: "HH:mm:ss" or "HH:mm"
  end_time?: string; // Format: "HH:mm:ss" or "HH:mm"
  date?: Date;
}
