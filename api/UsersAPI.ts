import apiService from "@/services/apiService";
import { User } from "@/types/User";
import { UUID } from "crypto";

const UsersAPI = {
  getUserById: async (user_id: UUID): Promise<User> => {
    /*
     * Fetches a user by their ID from the backend
     * @param user_id - ID of the user to fetch
     * @returns user object
     */
    try {
      const response = await apiService.get(`/users/get_user_by_id/${user_id}`);
      const user = response.data;
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};

export default UsersAPI;
