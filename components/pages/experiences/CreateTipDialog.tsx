import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import LocationSearch from "@/components/universal/LocationSearch";

// Zod schema for the tip form
const tipSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
});

// Type for the tip form values
type TipFormValues = z.infer<typeof tipSchema>;

export default function CreateTipDialog() {
  // State to manage the dialog open state
  const [isTipOpen, setIsTipOpen] = useState(false);

  // Handle tip form submission
  const handleTipSubmit = (data: TipFormValues) => {
    console.log(data);
    setIsTipOpen(false);
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
            <DialogTitle>Share Your Local Insight</DialogTitle>
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
  // Use react-hook-form to manage the form state
  const tipForm = useForm<TipFormValues>({
    resolver: zodResolver(tipSchema),
    mode: "onSubmit", // Validation triggered only on form submission
  });

  return (
    <Form {...tipForm}>
      <form onSubmit={tipForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={tipForm.control}
          name="description"
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
        {/* Add Google Maps API for location pin */}
        {/* <FormField
          control={tipForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationSearch
                  isForForm={true}
                  // set value to current user's city, country
                  onSelect={(value) => {
                    field.onChange(value); // Update react-hook-form field
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="ml-auto">
          Submit Tip
        </Button>
      </form>
    </Form>
  );
}
