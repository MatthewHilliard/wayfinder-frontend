import { toast } from "@/hooks/use-toast";
import apiService from "@/services/apiService";
import { Rating } from "@/types/Rating";
import { error } from "console";
import { UUID } from "crypto";

const RatingsAPI = {
  /*
   * Creates a new rating for an experience
   * @param ratingData - Object containing the rating details
   * @returns the created rating object
   */
  createRating: async (ratingData: {
    experience_id: UUID;
    rating_value: number | undefined;
    comment: string;
  }): Promise<Rating | string[]> => {
    try {
      const response = await apiService.post(
        "/ratings/create_rating/",
        ratingData
      );

      if (response.data) {
        toast({
          title: "Success!",
          description: "Rating created successfully.",
        });
        return response.data; // Return the created rating on success
      } else {
        // Parse and return validation errors if provided
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => (Array.isArray(error) ? error : [error])
        );
        toast({
          title: "Validation Error",
          description: tmpErrors.join("\n"), // Join multiple errors into a single string
          variant: "destructive",
        });
        throw new Error("An error occurred while creating the rating.");
      }
    } catch (error: any) {
      throw error;
    }
  },
  /*
   * Fetches the ratings for an experience by its ID
   * @param experience_id - ID of the experience
   * @returns array of Ratings
   */
  getExperienceRatings: async (experience_id: UUID): Promise<Rating[]> => {
    try {
      const response = await apiService.get(
        `/ratings/get_experience_ratings/${experience_id}`
      );
      const ratings = response.data as Rating[];
      return ratings;
    } catch (error) {
      console.error("Error fetching ratings:", error);
      throw error;
    }
  },
};

export default RatingsAPI;
