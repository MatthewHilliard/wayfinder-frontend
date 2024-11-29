// utils/locationHelpers.ts
import { City } from "@/types/City";
import { Location } from "@/types/Location";

/**
 * Formats a Location or City object into a readable location string.
 * @param data - The Location or City object.
 * @returns A formatted string of the location.
 */
export function formatLocation(data: Location | City): string {
  const parts =
    "location_id" in data
      ? [data.city_info?.name, data.region_info?.name, data.country_info?.name]
      : [data.name, data.region, data.country];

  return parts.filter(Boolean).join(", ");
}

/**
 * Generates a unique key for a City object.
 * Ensures city and country IDs do not collide when mapping.
 * @param city - The City object containing type and city_id.
 * @returns A unique key string.
 */
export function generateKey(city: City): string {
  return `${city.type}-${city.city_id}`;
}
