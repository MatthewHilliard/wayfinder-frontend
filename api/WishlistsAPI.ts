import { toast } from "@/hooks/use-toast";
import { getUserId } from "@/lib/actions";
import apiService from "@/services/apiService";
import { WishlistItem, type Wishlist } from "@/types/Wishlist";
import { UUID } from "crypto";

const WishlistsAPI = {
  /**
   * Creates a new wishlist for the current user
   * @param {string} title - Title of the wishlist
   * @returns {Promise<Wishlist | string>}
   */
  createWishlist: async (title: string): Promise<Wishlist | string[]> => {
    try {
      const userId = await getUserId();

      // Ensure the user is authenticated
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await apiService.post("/wishlists/create_wishlist", {
        title,
        user_id: userId,
      });

      if (response.data) {
        toast({
          title: "Success!",
          description: "Wishlist created successfully.",
        });
        // Return the created wishlist on success
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
        throw new Error("An error occurred while creating the wishlist.");
      }
    } catch (error) {
      throw error; // For unexpected errors
    }
  },
  /**
   * Creates a new wishlist item for a specified wishlist and experience
   * @param {string} wishlistId - ID of the wishlist
   * @param {string} experienceId - ID of the experience to add
   * @returns {Promise<WishlistItem | string>}
   */
  createWishlistItem: async (
    wishlistId: string,
    experienceId: string
  ): Promise<WishlistItem | string[]> => {
    try {
      const userId = await getUserId();

      // Ensure the user is authenticated
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await apiService.post(
        `/wishlists/create_wishlist_item/${wishlistId}`,
        {
          experience_id: experienceId,
          user_id: userId,
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
    } catch (error) {
      throw error; // For unexpected errors
    }
  },
  /*
   * Fetches the wishlists of the current user from the backend
   * @returns experience object
   */
  getUserWishlists: async (): Promise<Wishlist[]> => {
    try {
      // Await the resolved value of the userId
      const userId = await getUserId();

      // If the user is not logged in, return an empty array
      if (!userId) {
        return [];
      }

      const response = await apiService.get(
        `/wishlists/get_user_wishlists/${userId}`
      );
      const wishlists = response.data;
      return wishlists;
    } catch (error) {
      console.error("Error fetching wishlists:", error);
      throw error;
    }
  },
  /**
   * Fetches the wishlist items of the specified wishlist
   * @param {string} wishlistId - ID of the wishlist
   * @returns {Promise<WishlistItem[]>}
   */
  getWishlistItems: async (wishlistId: UUID): Promise<WishlistItem[]> => {
    try {
      // Await the resolved value of the userId
      const userId = await getUserId();

      // If the user is not logged in, return an empty array
      if (!userId) {
        return [];
      }

      const response = await apiService.get(
        `/wishlists/get_wishlist_items/${wishlistId}`
      );
      const wishlistItems = response.data;
      return wishlistItems;
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      throw error;
    }
  },
};

export default WishlistsAPI;
