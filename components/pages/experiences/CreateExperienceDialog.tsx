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
import { useEffect, useState } from "react";
import MapWithPinning from "./MapWithPinning";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Tag } from "@/types/Tag";
import TagFilter from "./TagFilter";
import TagsAPI from "@/api/TagsAPI";
import { PriceSelect } from "./PriceSelect";

// Declare file restriction constants for file upload
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

// Zod schema for the experience form
const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  tags: z.array(z.string()).optional(),
  image: z
    .any()
    .refine((file) => file instanceof File || file === undefined, {
      message: "Please upload a valid file.",
    })
    .refine((file) => (file ? file.size <= MAX_FILE_SIZE : true), {
      message: `File size must be less than ${
        MAX_FILE_SIZE / (1024 * 1024)
      } MB`,
    })
    .refine((file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : true), {
      message: `Invalid file type. Accepted types are: ${ACCEPTED_FILE_TYPES.join(
        ", "
      )}`,
    }),
  price: z.string().optional(),
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
      const { locationDetails, ...formData } = data;

      // Create a FormData object to handle multipart data
      const experienceData = new FormData();
      experienceData.append("title", formData.title);
      experienceData.append("description", formData.description);
      experienceData.append("latitude", String(locationDetails.lat));
      experienceData.append("longitude", String(locationDetails.lng));

      if (locationDetails.country) {
        experienceData.append("country_name", locationDetails.country);
      }
      if (locationDetails.region) {
        experienceData.append("region_name", locationDetails.region);
      }
      if (locationDetails.city) {
        experienceData.append("city_name", locationDetails.city);
      }

      // Convert tags array to a JSON string
      if (formData.tags) {
        experienceData.append("tags", JSON.stringify(formData.tags));
      }
      if (formData.price) {
        experienceData.append("price", String(formData.price));
      }
      if (formData.image) {
        experienceData.append("image", formData.image);
      }

      await ExperiencesAPI.createExperience(experienceData);

      setIsExperienceOpen(false);
    } catch (error) {
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

          {/* Paginated Experience form component */}
          <PaginatedExperienceForm onSubmit={handleExperienceSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function PaginatedExperienceForm({
  onSubmit,
}: {
  onSubmit: (data: ExperienceFormValues & { locationDetails: any }) => void;
}) {
  const experienceForm = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      tags: [],
      image: undefined,
      price: "",
    },
  });

  // State to manage the current page of the form
  const [currentPage, setCurrentPage] = useState(1);
  // State to store all tags from the API
  const [tags, setTags] = useState<Tag[]>([]);
  // State to manage the selected tags
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

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

  // Fetch tags on initial render
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await TagsAPI.getAllTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Function that updates the location details and form values
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

    console.log("Location selected:", location);
    experienceForm.setValue("location", `${location.lat},${location.lng}`);
  };

  // Function that updates the selected tags and form values
  const handleToggleTag = (tag: Tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);

    // Update the form value for tags to include only the IDs
    experienceForm.setValue(
      "tags",
      updatedTags.map((tag) => tag.tag_id)
    );
  };

  // Function that moves to the next page of the form if the current page is valid
  const goToNextPage = async () => {
    const isValid = await experienceForm.trigger([
      "title",
      "description",
      "location",
    ]);
    if (isValid) {
      setCurrentPage(2);
    }
  };

  return (
    <Form {...experienceForm}>
      <form
        onSubmit={experienceForm.handleSubmit((data) =>
          onSubmit({ ...data, locationDetails })
        )}
      >
        {currentPage === 1 && (
          <>
            <FormField
              control={experienceForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Experience Title" {...field} />
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
                      placeholder="Describe your experience"
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
            <Button
              type="button"
              variant={"outline"}
              onClick={goToNextPage}
              className="mt-4 float-right"
            >
              Next
            </Button>
          </>
        )}
        {currentPage === 2 && (
          <>
            <div className="mt-4">
              <TagFilter
                tags={tags}
                selectedTags={selectedTags}
                onToggleTag={handleToggleTag}
                isForForm={true}
              />
            </div>
            <FormField
              control={experienceForm.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Image (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={ACCEPTED_FILE_TYPES.join(",")}
                      onChange={(e) =>
                        experienceForm.setValue(
                          "image",
                          e.target.files?.[0] || undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={experienceForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (optional)</FormLabel>
                  <FormControl>
                    <PriceSelect
                      value={field.value || undefined} // Convert null to undefined for compatibility
                      onChange={field.onChange} // Update form state
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between mt-4">
              <Button type="button" variant={"outline"} onClick={() => setCurrentPage(1)}>
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
