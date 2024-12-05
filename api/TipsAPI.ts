import apiService from "@/services/apiService";
import { Tip } from "@/types/Tips";

const TipsAPI = {
  /*
   * Fetches all of a user's tips from the backend sorted by date posted
   * @returns array of tips
   */
  getTipsByUserId: async (userId: string): Promise<Tip[]> => {
    try {
      const response = await apiService.get(
        `/tips/get_tips_by_user_id/${userId}`
      );
      const tips = response.data;
      return tips;
    } catch (error) {
      console.error("Error fetching tips:", error);
      throw error;
    }
  },
};

export default TipsAPI;
