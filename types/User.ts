import { UUID } from "crypto";

export interface User {
  user_id: UUID
  name: string
  email: string
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: Date
  profile_picture?: string
  profile_picture_url?: string
  bio?: string
  country?: string
  city?: string
  last_login?: Date
}
