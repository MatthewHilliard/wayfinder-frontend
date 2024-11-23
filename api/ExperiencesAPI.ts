import apiService from "@/services/apiService";
import { Experience } from "@/types/Experience";
import { UUID } from "crypto";
import { get } from "http";

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
