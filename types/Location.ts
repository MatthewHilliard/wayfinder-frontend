import { UUID } from "crypto";

export interface Location {
  location_id: UUID
  country: string
  city: string
  latitude: number
  longitude: number
}