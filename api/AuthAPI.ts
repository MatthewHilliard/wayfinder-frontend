import apiService from "@/services/apiService";
import { Tag } from "@/types/Tag";

const AuthAPI = {
  /**
   * Register a new user with the backend
   * @param {string} name - Full name of the user
   * @param {string} email - Email address of the user
   * @param {string} password1 - Password
   * @param {string} password2 - Password confirmation
   * @returns {Promise<void>} Resolves if the registration is successful
   * @throws {Error} Throws an error if the registration fails
   */
  register: async (
    name: string,
    email: string,
    password1: string,
    password2: string
  ): Promise<string | string[]> => {
    try {
      const response = await apiService.post("/auth/register/", {
        name,
        email,
        password1,
        password2,
      });

      if (response.access) {
        console.log(response.access);
        return response.access;
      } else {
        // Parse and return validation errors
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => (Array.isArray(error) ? error : [error])
        );
        return tmpErrors;
      }
    } catch (error: any) {
      throw error; // For unexpected errors
    }
  },
};

export default AuthAPI;
