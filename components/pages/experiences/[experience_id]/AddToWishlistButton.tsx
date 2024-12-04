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

export default function AddToWishlistButton({
  experienceId,
}: {
  experienceId: UUID;
}) {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [selectedWishlist, setSelectedWishlist] = useState<UUID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<"add" | "added" | "loading">(
    "add"
  );

  // Use effect to run on component mount
  useEffect(() => {
    // Fetch the user's wishlists from the API
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

  const handleAddToWishlist = async () => {
    try {
      setIsLoading(true);
      setButtonText("loading");

      // Simulate a delay for the wishlist action
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // if all good, reset the button state
      setSelectedWishlist(null);
      setButtonText("added");
    } catch (error) {
      console.error(error);
      setButtonText("add");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isLoading}
          className={`group relative flex w-full text-sm items-center justify-center rounded-md border px-4 py-2 font-medium transition duration-300 ease-in-out ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "bg-background hover:bg-secondary"
          }`}
        >
          {buttonText === "add" && (
            <span className="group inline-flex items-center">
              <Heart className="mr-4 w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              Add to Wishlist
            </span>
          )}
          {buttonText === "loading" && (
            <span className="group inline-flex items-center">
              <svg
                className="w-4 h-4 animate-spin mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.42.876 4.63 2.322 6.291l1.678-1.682z"
                ></path>
              </svg>
              Loading...
            </span>
          )}
          {buttonText === "added" && (
            <span className="group inline-flex items-center">
              <Check className="mr-2 w-4 h-4" />
              Added to Wishlist!
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Select a Wishlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {wishlists && wishlists.length > 0 ? (
          wishlists.map((wishlist) => (
            <DropdownMenuItem
              key={wishlist.wishlist_id}
              className={`cursor-pointer ${
                selectedWishlist === wishlist.wishlist_id
                  ? "font-bold text-primary"
                  : ""
              }`}
              onClick={() => setSelectedWishlist(wishlist.wishlist_id)}
            >
              {wishlist.title}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem
            className="cursor-pointer"
          >
            Make a Wishlist!
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer rounded-md"
          onClick={handleAddToWishlist}
          disabled={!selectedWishlist || isLoading}
        >
          {isLoading ? "Adding..." : "Confirm"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}