/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component provides a dialog (`CreateWishlistDialog`) for creating a new wishlist 
 * within the application. It uses a form validated with Zod and React Hook Form for input handling. 
 * The form includes a title field, integrates with the `WishlistsAPI`, and ensures smooth user interaction 
 * with loading and error handling states. The dialog promotes better organization and planning for users' experiences.
 */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import WishlistsAPI from "@/api/WishlistsAPI";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";

// Zod schema for the wishlist form
const wishlistSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

// Type for the wishlist form values
type WishlistFormValues = z.infer<typeof wishlistSchema>;

export default function CreateWishlistDialog() {
  // State to manage the dialog open state
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Handle wishlist form submission
  const handleWishlistSubmit = async (data: WishlistFormValues) => {
    try {
      await WishlistsAPI.createWishlist(data.title);
      setIsWishlistOpen(false);
    } catch (error) {
      console.error("Error creating wishlist:", error);
    }
  };

  return (
    <>
      {/* Dialog component for creating a wishlist */}
      <Dialog open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
        <DialogTrigger asChild>
          <Button size="lg">Create Wishlist</Button>
        </DialogTrigger>

        {/* Dialog content for creating a wishlist */}
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create a Wishlist</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Create a Wishlist to Plan Your Next Getaway!
            </DialogDescription>
          </DialogHeader>

          {/* Wishlist form component */}
          <WishlistForm onSubmit={handleWishlistSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function WishlistForm({
  onSubmit,
}: {
  onSubmit: (data: WishlistFormValues) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading

  // Use react-hook-form to manage the form state
  const wishlistForm = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
    },
  });

  // Function to handle form submission with loading state
  const handleSubmit = async (data: WishlistFormValues) => {
    setLoading(true); // Start loading
    try {
      await onSubmit(data); // Wait for submission to complete
    } catch (error) {
      console.error("Error submitting wishlist:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Form {...wishlistForm}>
      <form
        onSubmit={wishlistForm.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <FormField
          control={wishlistForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter wishlist title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="ml-auto">
          {loading ? "Loading..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
