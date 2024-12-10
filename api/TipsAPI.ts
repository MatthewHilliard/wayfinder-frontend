/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This module provides a `TipsAPI` object for managing tips in the Wayfinder application. 
 * It includes methods to create new tips (`createTip`), fetch tips with optional filters (`getTipsWithFilters`), 
 * and retrieve all tips created by a specific user (`getTipsByUserId`). Toast notifications are used for 
 * success or error feedback, and the module ensures seamless backend communication and error handling.
 */

import { toast } from "@/hooks/use-toast";
import apiService from "@/services/apiService";
import { Tip } from "@/types/Tips";

const TipsAPI = {
  /*
   * Creates a new tip in the database
   * @param content - the content of the tip
   * @param location_type - the type of location the tip is for
   * @param location_id - the ID of the location the tip is for
   * @returns the created tip object, or an array of validation errors
   */
  createTip: async (
    content: string,
    location_type: string,
    location_id: number
  ): Promise<Tip | string[]> => {
    try {
      const response = await apiService.post("/tips/create_tip/", {
        content,
        location_type,
        location_id,
      });

      if (response.data) {
        toast({
          title: "Success!",
          description: "Tip created successfully.",
        });
        return response.data; // Return the created tip on success
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
        throw new Error("An error occurred while creating the tip.");
      }
    } catch (error: any) {
      throw error;
    }
  },
  /*
   * Fetches tips with optional filters
   * @param locationType - Optional location type ("country" or "city")
   * @param locationId - Optional location ID
   * @returns array of filtered tips
   */
  getTipsWithFilters: async (
    locationType?: string,
    locationId?: string
  ): Promise<Tip[]> => {
    try {
      // Construct query string dynamically
      const queryParams = new URLSearchParams();

      // Append location type and ID if provided
      if (locationType) {
        queryParams.append("location_type", locationType);
      }
      if (locationId) {
        queryParams.append("location_id", locationId);
      }

      // Convert query string to URL-encoded string
      const queryString = queryParams.toString();

      // Send GET request with query string
      const response = await apiService.get(
        `/tips/get_tips_with_filters/?${queryString}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching tips with filters:", error);
      throw error;
    }
  },
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
