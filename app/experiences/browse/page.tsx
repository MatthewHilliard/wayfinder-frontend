"use client";

import { useEffect, useState } from "react";
import { Tag } from "@/types/Tag";
import { Experience } from "@/types/Experience";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import ExperienceCard from "@/components/pages/experiences/browse/ExperienceCard";
import LocationSearch from "@/components/universal/LocationSearch";
import ExperienceSearch from "@/components/pages/experiences/browse/ExperienceSearch";
import TagFilter from "@/components/pages/experiences/browse/TagFilter";
import { Label } from "@radix-ui/react-label";
import { useSearchParams } from "next/navigation";
import { City } from "@/types/City";
import TagsAPI from "@/api/TagsAPI";

export default function BrowseExperiences() {
  // State variable to store experiences loading state
  const [experiencesLoading, setExperiencesLoading] = useState<boolean>(true);
  // State variable to store experiences fetched from the API
  const [experiences, setExperiences] = useState<Experience[]>([]);
  // State variable to store tags fetched from the API
  const [tags, setTags] = useState<Tag[]>([]);
  // State variable to store selected tags
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  // State variable to store search query for location
  const [locationSearch, setLocationSearch] = useState<City | null>(null);
  // State to track initial render of the component
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Initialize searchParams hook
  const searchParams = useSearchParams();

  // Fetch data on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setExperiencesLoading(true);

        // Fetch tags
        const fetchedTags = await TagsAPI.getAllTags();
        setTags(fetchedTags);

        // Fetch experiences based on search params
        const cityQuery = searchParams.get("cityObject");
        const tagQuery = searchParams.get("tag");

        let filteredTags: Tag[] = [];
        if (tagQuery) {
          filteredTags = fetchedTags.filter((tag) => tag.name === tagQuery);
          setSelectedTags(filteredTags);
        }

        let city: City | null = null;
        if (cityQuery) {
          city = JSON.parse(decodeURIComponent(cityQuery));
          setLocationSearch(city);
        }

        const fetchedExperiences =
          await ExperiencesAPI.getExperiencesWithFilters(
            filteredTags.map((tag) => tag.name),
            city?.type,
            city?.city_id
          );

        setExperiences(fetchedExperiences);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setExperiencesLoading(false);
        setIsInitialMount(false);
      }
    };

    void fetchInitialData();
  }, [searchParams]);

  // Re-fetch experiences whenever filters (tags/location) change
  useEffect(() => {
    if (isInitialMount) return; // Skip on initial mount

    const fetchFilteredExperiences = async () => {
      try {
        setExperiencesLoading(true);

        const tagNames = selectedTags.map((tag) => tag.name);
        const locationType = locationSearch?.type; // "city" or "country"
        const locationId = locationSearch?.city_id;

        const fetchedExperiences =
          await ExperiencesAPI.getExperiencesWithFilters(
            tagNames,
            locationType,
            locationId
          );

        setExperiences(fetchedExperiences || []);
      } catch (error) {
        console.error("Failed to fetch filtered experiences:", error);
      } finally {
        setExperiencesLoading(false);
      }
    };

    void fetchFilteredExperiences();
  }, [selectedTags, locationSearch]);

  // Function to toggle a tag
  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Browse Experiences</h1>

      {/* Flex container for aligned searches */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <div className="w-full">
          <Label
            htmlFor="location-search"
            className="block mb-2 text-sm font-medium"
          >
            Search by Location
          </Label>
          <LocationSearch
            onSelect={(newLocation) => setLocationSearch(newLocation)}
          />
        </div>
        <div className="w-full">
          <Label
            htmlFor="experience-search"
            className="block mb-2 text-sm font-medium"
          >
            Search by Experience
          </Label>
          <ExperienceSearch />
        </div>
      </div>

      {/* TagFilter Component */}
      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
      />

      {/* Container for Resulting Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {experiences && experiences.length > 0 ? (
          experiences.map((experience) => (
            <ExperienceCard
              key={experience.experience_id}
              experience={experience}
            />
          ))
        ) : (
          <p>No experiences found.</p>
        )}
      </div>
    </div>
  );
}
