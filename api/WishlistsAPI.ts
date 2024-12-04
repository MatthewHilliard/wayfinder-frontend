import { getUserId } from "@/lib/actions";
import apiService from "@/services/apiService";
import { type Wishlist } from "@/types/Wishlist";

const WishlistsAPI = {
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
