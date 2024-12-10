/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: The `CreateTipDialog` component provides users with an intuitive interface to share travel tips. 
 * Users can describe their tip and specify a location using a dynamic location search. 
 * The `TipForm` component handles input validation with Zod and manages form state using React Hook Form. 
 * A seamless and accessible dialog interface encourages community engagement and collaboration.
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import LocationSearch from "@/components/universal/LocationSearch";
import { DialogDescription } from "@radix-ui/react-dialog";
import { City } from "@/types/City";
import TipsAPI from "@/api/TipsAPI";

// Zod schema for the tip form
const tipSchema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters"),
  location: z.object({
    location_id: z.number(),
    location_type: z.string(),
  }),
});

// Type for the tip form values
type TipFormValues = z.infer<typeof tipSchema>;

export default function CreateTipDialog() {
  // State to manage the dialog open state
  const [isTipOpen, setIsTipOpen] = useState(false);

  // Handle tip form submission
  const handleTipSubmit = async (data: TipFormValues) => {
    try {
      await TipsAPI.createTip(
        data.content,
        data.location.location_type,
        data.location.location_id
      );

      setIsTipOpen(false);
    } catch (error) {
      console.error("Error creating tip:", error);
    }
  };

  return (
    <>
      {/* Dialog component for creating a tip */}
      <Dialog open={isTipOpen} onOpenChange={setIsTipOpen}>
        <DialogTrigger asChild>
          <Button size="lg">Share a Travel Tip</Button>
        </DialogTrigger>

        {/* Dialog content for creating a tip */}
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Share Your Tip</DialogTitle>

            <DialogDescription className="text-sm text-gray-600">
              Share your insider knowledge with fellow travelers!
            </DialogDescription>
          </DialogHeader>

          {/* Tip form component */}
          <TipForm onSubmit={handleTipSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TipForm({
  onSubmit,
}: {
  onSubmit: (data: TipFormValues) => void;
}) {
  const [loading, setLoading] = useState(false); // State to manage loading

  // Use react-hook-form to manage the form state
  const tipForm = useForm<TipFormValues>({
    resolver: zodResolver(tipSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
      location: {
        location_id: undefined,
        location_type: "",
      },
    },
  });

  // Function to handle location selection
  const handleLocationSelect = (
    city: City | null,
    field: ControllerRenderProps<TipFormValues, "location">
  ) => {
    if (city) {
      field.onChange({
        location_id: city.city_id,
        location_type: city.type,
      });
    } else {
      field.onChange({
        location_id: "",
        location_type: "",
      });
    }
  };

  // Function to handle form submission with loading state
  const handleSubmit = async (data: TipFormValues) => {
    setLoading(true); // Start loading state
    try {
      await onSubmit(data); // Submit the form
    } catch (error) {
      console.error("Error submitting tip:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Form {...tipForm}>
      <form onSubmit={tipForm.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={tipForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us your insider info!"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={tipForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationSearch
                  placeholder="Where is this tip for?"
                  onSelect={(city) => handleLocationSelect(city, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="ml-auto">
          {loading ? "Loading..." : "Submit Tip"}
        </Button>
      </form>
    </Form>
  );
}
