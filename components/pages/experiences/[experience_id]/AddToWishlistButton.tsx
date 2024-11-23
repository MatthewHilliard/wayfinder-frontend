"use client"

import { useState } from "react"
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function AddToWishlistButton({ experienceId }: { experienceId: string }) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToWishlist = async () => {
    // Here you would typically make an API call to add the experience to the user's wishlist
    // For this example, we'll just toggle the state
    setIsAdded(!isAdded)
  }

  return (
    <Button
      onClick={handleAddToWishlist}
      variant={isAdded ? "secondary" : "default"}
      className="w-full"
    >
      <Heart className={`w-4 h-4 mr-2 ${isAdded ? "fill-current" : ""}`} />
      {isAdded ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  )
}

