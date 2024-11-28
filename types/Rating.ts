import { UUID } from "crypto";
import { User } from "./User";
import { Experience } from "./Experience";

export interface Rating {
  rating_id: UUID;
  user: UUID;
  user_info: User;
  experience: UUID;
  experience_info: Experience;
  date_posted: Date;
  comment?: string;
  rating_value?: number;
}
