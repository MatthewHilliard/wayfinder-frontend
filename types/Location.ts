import { UUID } from "crypto";
import { Country } from "./Country";
import { City } from "./City";
import { Region } from "./Region";

export interface Location {
  location_id: UUID;
  country: string;
  country_info: Country;
  region: string;
  region_info: Region;
  city: string;
  city_info: City;
  latitude: number;
  longitude: number;
}

export interface LocationDetails {
  lat: number | null;
  lng: number | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
};