"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Heart } from "lucide-react";
import { UUID } from "crypto";
import { Wishlist } from "@/types/Wishlist";
import WishlistsAPI from "@/api/WishlistsAPI";
import { Button } from "@/components/ui/button";

export default function AddToWishlistButton({
  experienceId,
}: {
  experienceId: UUID;
}) {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]); // State to store the user's wishlists
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to store the loading state of the button
  const [buttonText, setButtonText] = useState<"add" | "added" | "loading">(
    "add"
  ); // State to store the text of the button

  // Use effect to fetch wishlists on component mount
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const fetchedWishlists = await WishlistsAPI.getUserWishlists();
        setWishlists(fetchedWishlists);
      } catch (error) {
        console.error("Failed to fetch wishlists:", error);
      }
    };

    void fetchWishlists();
  }, []);

  // Function to handle adding the experience to the selected wishlist
  const handleAddToWishlist = async (wishlistId: UUID) => {
    try {
      setIsLoading(true);
      setButtonText("loading");

      // Add item to the selected wishlist
      await WishlistsAPI.createWishlistItem(wishlistId, experienceId);

      setButtonText("added");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      setButtonText("add");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isLoading}
          className={`bg-background group relative flex w-full text-sm items-center justify-center rounded-md border px-4 py-2 font-medium ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary"
          }`}
        >
          {buttonText === "add" && (
            <span className="group inline-flex items-center">
              <Heart className="mr-4 w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              Add to Wishlist
            </span>
          )}
          {buttonText === "loading" && (
            <span className="group inline-flex items-center">Loading...</span>
          )}
          {buttonText === "added" && (
            <span className="group inline-flex items-center">
              <Check className="mr-2 w-4 h-4" />
              Added to Wishlist!
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Select a Wishlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {wishlists && wishlists.length > 0 ? (
          wishlists.map((wishlist) => (
            <DropdownMenuItem
              key={wishlist.wishlist_id}
              className="cursor-pointer"
              onClick={() => handleAddToWishlist(wishlist.wishlist_id)}
            >
              {wishlist.title}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            Make a Wishlist!
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
