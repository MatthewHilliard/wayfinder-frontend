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

// Zod schema for the experience form
const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  experienceTags: z.enum(["tag1"]),
});

// Type for the experience form values
type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function CreateExperienceDialog() {
  // State to manage the dialog open state
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  // Handle experience form submission
  const handleExperienceSubmit = (data: ExperienceFormValues) => {
    console.log(data);
    setIsExperienceOpen(false);
  };

  return (
    <>
      {/* Dialog component for creating an experience */}
      <Dialog open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" size="lg">
            Share an Experience
          </Button>
        </DialogTrigger>

        {/* Dialog content for creating an experience */}
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Share Your Experience</DialogTitle>
          </DialogHeader>

          {/* Experience form component */}
          <ExperienceForm onSubmit={handleExperienceSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ExperienceForm({
  onSubmit,
}: {
  onSubmit: (data: ExperienceFormValues) => void;
}) {
  // Use react-hook-form to manage the form state
  const experienceForm = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    mode: "onSubmit", // Validation triggered only on form submission
  });

  return (
    <Form {...experienceForm}>
      <form
        onSubmit={experienceForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={experienceForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is the name of this experience?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add Google Maps API for location pin */}
        {/* <FormField
          control={experienceForm.control}
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
        <FormField
          control={experienceForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about this amazing experience"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto bg-secondary">
          Submit Experience
        </Button>
      </form>
    </Form>
  );
}
