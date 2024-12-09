import { UUID } from "crypto";
import { Country } from "./Country";
import { City } from "./City";

export interface User {
  id: UUID;
  name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: Date;
  profile_picture?: string;
  bio?: string;
  country: string;
  country_info: Country;
  city?: string;
  city_info?: City;
  last_login?: Date;
}
