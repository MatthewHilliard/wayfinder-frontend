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
import MapWithPinning from "./MapWithPinning";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "@/hooks/use-toast";

// Zod schema for the experience form
const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // experienceTags: z.enum(["tag1"]),
});

// Type for the experience form values
type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function CreateExperienceDialog() {
  // State to manage the dialog open state
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  // Handle experience form submission
  const handleExperienceSubmit = async (
    data: ExperienceFormValues & { locationDetails: any }
  ) => {
    try {
      console.log("Submitting experience data:", data);
      const { locationDetails, ...formData } = data;

      // Combine formData and locationDetails into the correct structure
      const experienceData = {
        ...formData,
        latitude: locationDetails.lat,
        longitude: locationDetails.lng,
        country_name: locationDetails.country,
        region_name: locationDetails.region,
        city_name: locationDetails.city,
        // tags: [formData.experienceTags], // Convert single tag to array as API expects
      };

      const result = await ExperiencesAPI.createExperience(experienceData);

      if (Array.isArray(result)) {
        // Validation errors
        toast({
          title: "Validation Error",
          description: result.join("\n"), // Join multiple errors into a single string
          variant: "destructive",
        }); 
      } else {
        // Success
        toast({
          title: "Success!",
          description: "Experience created successfully.",
        });
        setIsExperienceOpen(false);
        console.log("Experience created successfully:", result);
      }
    } catch (error) {
      // Handle unexpected errors
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to create experience:", error);
    }
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
          <DialogDescription className="text-sm text-gray-600">
            Share your experience with the world by filling out the form below.
          </DialogDescription>

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
  onSubmit: (data: ExperienceFormValues & { locationDetails: any }) => void;
}) {
  // Use react-hook-form to manage the form state
  const experienceForm = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    mode: "onSubmit", // Validation triggered only on form submission
    defaultValues: {
      title: "", // Default value for title
      location: "", // Default value for location
      description: "", // Default value for description
    },
  });

  // State to manage the location details
  const [locationDetails, setLocationDetails] = useState<{
    lat: number | null;
    lng: number | null;
    country: string | null;
    region: string | null;
    city: string | null;
  }>({
    lat: null,
    lng: null,
    country: null,
    region: null,
    city: null,
  });

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    country?: string;
    region?: string;
    city?: string;
  }) => {
    setLocationDetails({
      lat: location.lat,
      lng: location.lng,
      country: location.country || null,
      region: location.region || null,
      city: location.city || null,
    });
    console.log("Selected Location Details:", location);

    experienceForm.setValue("location", `${location.lat},${location.lng}`); // Update form's location field
  };

  return (
    <Form {...experienceForm}>
      <form
        onSubmit={experienceForm.handleSubmit((data) =>
          onSubmit({ ...data, locationDetails })
        )}
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
        <FormField
          control={experienceForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <MapWithPinning onLocationSelect={handleLocationSelect} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
