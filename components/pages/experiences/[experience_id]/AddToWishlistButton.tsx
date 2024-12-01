"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { UUID } from "crypto";

export default function AddToWishlistButton({
  experienceId,
}: {
  experienceId: UUID;
}) {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the user's wishlist status
  }, []);

  const handleClick = async () => {
    setIsLoading(true);

    // Simulate a delay for the wishlist action
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsInWishlist(!isInWishlist);
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button
        disabled={isLoading} // Disable the button while loading
        className={`group relative flex w-full text-sm items-center bg-background justify-center rounded-md border px-4 py-2 font-medium transition duration-300 ease-in-out ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "bg-background hover:bg-secondary"
        }`}
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isLoading ? (
          <motion.span key="loading" className="relative flex items-center">
            <svg
              className="w-4 h-4 animate-spin"
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
            <span className="ml-2">Loading...</span>
          </motion.span>
        ) : isInWishlist ? (
          <motion.span
            key="remove"
            className="relative block h-full w-full"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            <span className="group inline-flex items-center">
              <Check className="mr-2 w-4 h-4" />
              Added to Wishlist!
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="add"
            className="relative block"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            <span className="group inline-flex items-center">
              <Heart className="mr-4 w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              Add to Wishlist
            </span>
          </motion.span>
        )}
      </motion.button>
    </AnimatePresence>
  );
}
