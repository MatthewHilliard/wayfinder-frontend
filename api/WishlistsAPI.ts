import { getUserId } from "@/lib/actions";
import apiService from "@/services/apiService";
import { WishlistItem, type Wishlist } from "@/types/Wishlist";

const WishlistsAPI = {
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
        // Return the created experience on success
        return response.data;
      } else {
        // Parse and return validation errors if provided
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => (Array.isArray(error) ? error : [error])
        );
        return tmpErrors;
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
};

export default WishlistsAPI;
