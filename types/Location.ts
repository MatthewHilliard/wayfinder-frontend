import { UUID } from "crypto";
import { Country } from "./Country";
import { City } from "./City";

export interface Location {
  location_id: UUID;
  country: string;
  country_info: Country;
  city: string;
  city_info: City;
  latitude: number;
  longitude: number;
}