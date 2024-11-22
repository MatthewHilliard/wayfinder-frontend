import { UUID } from "crypto";

export interface User {
  user_id: UUID
  name: string
  email: string
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: Date
  profile_picture?: string | null
  bio?: string
  country?: string | null
  city?: string | null
  last_login?: Date
}
