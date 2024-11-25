import apiService from "@/services/apiService";
import { City } from "@/types/City";

const LocationsAPI = {
  /**
   * Fetches cities matching the given query from the backend.
   * @param query - The search string for city, region, or country.
   * @returns array of city objects.
   */
  citySearch: async (query: string): Promise<City[]> => {
    try {
      // Manually construct query string
      const queryString = new URLSearchParams({ q: query }).toString();
      const response = await apiService.get(
        `/locations/city_search/?${queryString}`
      );
      const cities = response.data; // Assumes API returns an array of city objects
      return cities;
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  },
};

export default LocationsAPI;
