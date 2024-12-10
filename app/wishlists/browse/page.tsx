"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a page for browsing the user's wishlists. It fetches wishlists 
 * dynamically from the backend and displays them in a responsive grid layout. Users can click on a wishlist 
 * to view its contents or create a new wishlist using the provided dialog. The page handles loading states 
 * and gracefully displays a message when no wishlists are found.
 */

import { Wishlist } from "@/types/Wishlist";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CreateWishlistDialog from "@/components/pages/wishlists/CreateWishlistDialog";
import WishlistsAPI from "@/api/WishlistsAPI";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";

export default function BrowseWishlists() {
  // State to store the wishlists fetched from the API
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  // State to store the wishlist loading status
  const [wishlistsLoading, setWishlistsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Use effect to run on component mount
  useEffect(() => {
    // Function to fetch wishlists from the API
    const fetchUserWishlists = async () => {
      try {
        setWishlistsLoading(true);
        const fetchedWishlists = await WishlistsAPI.getUserWishlists();
        setWishlists(fetchedWishlists);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setWishlistsLoading(false);
      }
    };

    void fetchUserWishlists();
  }, []);

  const handleWishlistClicked = (wishlist_id: UUID, title: string) => {
    router.push(`/wishlists/${wishlist_id}?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="container mx-auto py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Browse Wishlists</h1>
        <CreateWishlistDialog />
      </div>

      {/* Main Content */}
      {wishlistsLoading ? (
        // Show loading message
        <div className="flex justify-center items-center">
          <p className="text-center text-lg">Loading wishlists...</p>
        </div>
      ) : wishlists && wishlists.length > 0 ? (
        // Display wishlists
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist) => (
            <Card
              key={wishlist.wishlist_id}
              className="cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleWishlistClicked(wishlist.wishlist_id, wishlist.title)}
              >
              <CardHeader>
                <CardTitle>{wishlist.title}</CardTitle>
                <CardDescription>
                  Created on{" "}
                  {new Date(wishlist.created_date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        // Show "No wishlists" message
        <p className="col-span-full text-center">
          No wishlists found. Create one using the button above!
        </p>
      )}
    </div>
  );
}
