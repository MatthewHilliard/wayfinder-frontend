/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This module provides an `ExperiencesAPI` object that handles CRUD operations and queries 
 * related to experiences in the Wayfinder application. It includes methods for creating new experiences, 
 * fetching all experiences, applying filters to retrieve specific experiences, and fetching experiences 
 * by ID or user ID. Toast notifications are used to display success or error messages, and API service 
 * interactions ensure seamless backend communication.
 */

import { toast } from "@/hooks/use-toast";
import apiService from "@/services/apiService";
import { Experience } from "@/types/Experience";
import { UUID } from "crypto";

const ExperiencesAPI = {
  /*
   * Creates a new experience in the backend
   * @param experienceData - Object containing the experience details
   * @returns the created experience object
   */
  createExperience: async (
    experienceData:
      | FormData
      | {
          title: string;
          description: string;
          latitude: number;
          longitude: number;
          country_name?: string;
          region_name?: string;
          city_name?: string;
          tags?: string[];
          price?: number;
          image?: File;
        }
  ): Promise<Experience | string[]> => {
    try {
      // Use FormData directly or convert to JSON for structured data
      const isFormData = experienceData instanceof FormData;

      const response = await apiService.post(
        "/experiences/create_experience/",
        experienceData,
        {
          headers: isFormData
            ? {} // Let the browser handle the `Content-Type` for FormData
            : { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        toast({
          title: "Success!",
          description: "Experience created successfully.",
        });
        // Return the created experience on success
        return response.data;
      } else {
        // Parse and return validation errors if provided
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => (Array.isArray(error) ? error : [error])
        );
        // Validation errors
        toast({
          title: "Validation Error",
          description: tmpErrors.join("\n"), // Join multiple errors into a single string
          variant: "destructive",
        });
        throw new Error("An error occurred while creating the experience.");
      }
    } catch (error: any) {
      throw error; // For unexpected errors
    }
  },
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
  /*
   * Fetches experiences with optional filters
   * @param tags - Optional array of tag names
   * @param locationType - Optional location type ("country" or "city")
   * @param locationId - Optional location ID
   * @returns array of filtered experiences
   */
  getExperiencesWithFilters: async (
    tags?: string[],
    searchQuery?: string,
    locationType?: string,
    locationId?: string
  ): Promise<Experience[]> => {
    try {
      // Construct query string dynamically
      const queryParams = new URLSearchParams();

      // Append tags if provided
      if (tags) {
        queryParams.append("tags", tags.join(","));
      }

      // Append search query if provided
      if (searchQuery) {
        queryParams.append("search_query", searchQuery);
      }

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
        `/experiences/get_experiences_with_filters/?${queryString}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching experiences with filters:", error);
      throw error;
    }
  },
  /*
   * Fetches an experience by its ID from the backend
   * @param experience_id - ID of the experience to fetch
   * @returns experience object
   */
  getExperienceById: async (experience_id: UUID): Promise<Experience> => {
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
  /*
   * Fetches experiences by user ID from the backend
   * @param user_id - ID of the user to fetch experiences for
   * @returns array of experiences
   */
  getExperiencesByUserId: async (user_id: UUID): Promise<Experience[]> => {
    try {
      const response = await apiService.get(
        `/experiences/get_experiences_by_user_id/${user_id}`
      );
      const experiences = response.data;
      return experiences;
    } catch (error) {
      console.error("Error fetching user's experiences:", error);
      throw error;
    }
  },
};

export default ExperiencesAPI;
