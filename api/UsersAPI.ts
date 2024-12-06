import { toast } from "@/hooks/use-toast";
import { getUserId } from "@/lib/actions";
import apiService from "@/services/apiService";
import { User } from "@/types/User";
import { UUID } from "crypto";

const UsersAPI = {
  /*
   * Fetches a user by their ID from the backend
   * @param user_id - ID of the user to fetch
   * @returns user object
   */
  getUserById: async (user_id: UUID): Promise<User> => {
    try {
      const response = await apiService.get(`/users/get_user_by_id/${user_id}`);
      const user = response.data;
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  /**
   * Updates a user's profile
   * @param formData - Form data containing the updated user information
   * @returns the updated user object or an array of validation errors
   */
  updateProfile: async (formData: FormData): Promise<User | string[]> => {
    try {
      const currentUserId = await getUserId();

      if (!currentUserId) {
        throw new Error("User is not authenticated.");
      }

      // Send the formData to the backend API
      const response = await apiService.put(
        `/users/update_user/${currentUserId}/`,
        formData
      );

      if (response.data) {
        toast({
          title: "Success!",
          description: "Profile updated successfully.",
        });
        // Return the updated user on success
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
        throw new Error("An error occurred while updating the profile.");
      }
    } catch (error: any) {
      // Handle unexpected errors
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  },
};

export default UsersAPI;
