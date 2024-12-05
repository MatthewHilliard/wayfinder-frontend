import { UUID } from "crypto";
import { Country } from "./Country";
import { City } from "./City";
import { User } from "./User";

export interface Tip {
  tip_id: UUID;
  content: string;
  country: UUID;
  country_info: Country;
  city: UUID;
  city_info: City;
  creator: UUID;
  creator_info: User;
  date_posted: Date;
}
