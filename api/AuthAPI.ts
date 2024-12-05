import { toast } from "@/hooks/use-toast";
import { handleLogin } from "@/lib/actions";
import apiService from "@/services/apiService";
import { City } from "@/types/City";
import { Tag } from "@/types/Tag";

const AuthAPI = {
  /**
   * Register a new user with the backend
   * @param {string} name - Full name of the user
   * @param {string} email - Email address of the user
   * @param {string} password1 - Password
   * @param {string} password2 - Password confirmation
   * @param {string} location_type - Type of location
   * @param {number} location_id - ID of the location
   * @returns {Promise<string | string[]>} Resolves if the registration is successful
   * @throws {Error} Throws an error if the registration fails
   */
  register: async (
    name: string,
    email: string,
    password1: string,
    password2: string,
    location_type: string,
    location_id: number
  ): Promise<string | string[]> => {
    try {
      const response = await apiService.post("/auth/register/", {
        name,
        email,
        password1,
        password2,
        location_type,
        location_id,
      });

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        toast({
          title: "Success!",
          description: "You have successfully registered.",
        });
        return response.user.pk;
      } else {
        // Parse and return validation errors
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => (Array.isArray(error) ? error : [error])
        );
        toast({
          title: "Registration Error",
          description: tmpErrors.join("\n"),
          variant: "destructive",
        });
        throw new Error("An error occurred while registering.");
      }
    } catch (error: any) {
      throw error; // For unexpected errors
    }
  },
  /**
   * Login a prexisting user with the backend
   * @param {string} email - Email address of the user
   * @param {string} password - Password
   * @returns {Promise<string | string[]>} Resolves if the login is successful
   * @throws {Error} Throws an error if the registration fails
   */
  login: async (
    email: string,
    password: string
  ): Promise<string | string[]> => {
    try {
      const response = await apiService.post("/auth/login/", {
        email,
        password,
      });

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        toast({
          title: "Success!",
          description: "You have successfully logged in.",
        });
        return response.user.pk;
      } else {
        // Parse and return validation errors
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => (Array.isArray(error) ? error : [error])
        );
        toast({
          title: "Login Error",
          description: tmpErrors.join("\n") || "Invalid email or password.",
          variant: "destructive",
        });
        throw new Error("An error occurred while logging in.");
      }
    } catch (error: any) {
      throw error; // For unexpected errors
    }
  },
};

export default AuthAPI;
