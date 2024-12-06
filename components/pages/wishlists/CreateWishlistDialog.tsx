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
  // Use react-hook-form to manage the form state
  const wishlistForm = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
    },
  });

  return (
    <Form {...wishlistForm}>
      <form
        onSubmit={wishlistForm.handleSubmit(onSubmit)}
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
        <Button type="submit" className="ml-auto">
          Create
        </Button>
      </form>
    </Form>
  );
}
