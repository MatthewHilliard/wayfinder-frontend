// utils/locationHelpers.ts
import { City } from "@/types/City";

/**
 * Formats a City object into a readable location string.
 * @param city - The City object containing name, region, and country.
 * @returns A formatted string of the location.
 */
export function formatLocation(city: City): string {
  const parts = [city.name, city.region, city.country].filter(Boolean);
  return parts.join(", ");
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