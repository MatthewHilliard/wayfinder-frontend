/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a dialog for users to leave a rating and comment for an experience. 
 * It integrates form validation using Zod and React Hook Form, ensuring a seamless user experience. Users 
 * can provide an optional numeric rating (1-5) and a required comment. Upon submission, the data is sent to 
 * the backend API to create a new rating. The component handles dialog visibility, input validation, and 
 * API interaction gracefully.
 */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import RatingsAPI from "@/api/RatingsAPI";
import { UUID } from "crypto";
import { MessageSquare } from "lucide-react";

// Zod schema for the rating form
const ratingSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  rating_value: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be greater than 5")
    .optional(),
});

// Type for the form values
type RatingFormValues = z.infer<typeof ratingSchema>;

export default function CreateRatingDialog({
  experienceId,
}: {
  experienceId: UUID;
}) {
  const [isOpen, setIsOpen] = useState(false); // State variable to control dialog visibility

  // React Hook Form setup
  const form = useForm<RatingFormValues>({
    resolver: zodResolver(ratingSchema),
    mode: "onSubmit",
    defaultValues: {
      comment: "",
      rating_value: undefined,
    },
  });

  // Function to create a new rating for the experience in the API and update the ratings state
  const handleRatingSubmit = async (data: RatingFormValues) => {
    try {
      await RatingsAPI.createRating({
        experience_id: experienceId,
        rating_value: data.rating_value,
        comment: data.comment,
      });

      setIsOpen(false); // Close the dialog
    } catch (error) {
      console.error("Failed to create rating:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full hover:bg-secondary">
          <MessageSquare className="w-4 h-4 mr-2" />
          Leave a Rating
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Leave a Rating</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRatingSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your comment here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (Optional)</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(
                          value === "undefined"
                            ? undefined
                            : parseInt(value, 10)
                        )
                      }
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undefined">No Rating</SelectItem>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <SelectItem key={value} value={String(value)}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
