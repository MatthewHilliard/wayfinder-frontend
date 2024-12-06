"use client";

import WishlistsAPI from "@/api/WishlistsAPI";
import ExperienceCard from "@/components/pages/experiences/browse/ExperienceCard";
import { WishlistItem } from "@/types/Wishlist";
import { UUID } from "crypto";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  // State variable to store wishlist items
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Get parameters from URL
  const params = useParams();
  const searchParams = useSearchParams();
  const wishlist_id = Array.isArray(params.wishlist_id)
    ? params.wishlist_id[0]
    : params.wishlist_id;
  const wishlistTitle = searchParams.get("title") || "Wishlist";

  // UseEffect hook to run on component mount
  useEffect(() => {
    // Function to fetch wishlists from the API
    const fetchWishlistItems = async () => {
      try {
        const fetchedWishlists = await WishlistsAPI.getWishlistItems(
          wishlist_id as UUID
        );
        setWishlistItems(fetchedWishlists);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    void fetchWishlistItems();
  }, [wishlist_id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{wishlistTitle}</h1>
      </div>

      {/* Container for Wishlist Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <ExperienceCard
              key={item.experience_info.experience_id}
              experience={item.experience_info}
            />
          ))
        ) : (
          <p>No wishlist items found.</p>
        )}
      </div>
    </div>
  );
}
