import apiService from "@/services/apiService";
import { Experience } from "@/types/Experience";
import { UUID } from "crypto";

const ExperiencesAPI = {
  /*
   * Fetches all experiences from the backend
   * @returns array of experiences
   */
  getAllExperiences: async (): Promise<Experience[]> => {
    try {
      const response = await apiService.get("/experiences/get_experiences/");
      const experiences = response.data;
      return experiences;
    } catch (error) {
      console.error("Error fetching experiences:", error);
      throw error;
    }
  },
  getExperiencesWithFilters: async (
    tags?: string[],
    locationType?: string,
    locationId?: string
  ): Promise<Experience[]> => {
    /*
     * Fetches experiences with optional filters
     * @param tags - Optional array of tag names
     * @param locationType - Optional location type ("country" or "city")
     * @param locationId - Optional location ID
     * @returns array of filtered experiences
     */
    try {
      // Construct query string dynamically
      const queryParams = new URLSearchParams();

      // Append tags if provided
      if (tags) {
        tags.forEach((tag) => queryParams.append("tags", tag));
      }

      // Append location type and ID if provided
      if (locationType) {
        queryParams.append("location_type", locationType);
      }
      if (locationId) {
        queryParams.append("location_id", locationId);
      }

      const queryString = queryParams.toString();

      // Send GET request with query string
      const response = await apiService.get(
        `/experiences/get_experiences_with_filters/?${queryString}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching experiences with filters:", error);
      throw error;
    }
  },
  getExperienceById: async (experience_id: UUID): Promise<Experience> => {
    /*
     * Fetches an experience by its ID from the backend
     * @param experience_id - ID of the experience to fetch
     * @returns experience object
     */
    try {
      const response = await apiService.get(
        `/experiences/get_experience_by_id/${experience_id}`
      );
      const experience = response.data;
      return experience;
    } catch (error) {
      console.error("Error fetching experience:", error);
      throw error;
    }
  },
};

export default ExperiencesAPI;
