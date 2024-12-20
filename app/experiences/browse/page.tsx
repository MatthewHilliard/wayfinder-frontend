"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders the "Browse Experiences" page, allowing users to search, filter, 
 * and explore experiences. It integrates location-based search, experience name search, and tag filtering 
 * to refine results. The page dynamically fetches and displays experiences based on user-selected criteria 
 * and supports creating new experiences via a dialog.
 */

import { Suspense, useEffect, useState } from "react";
import { Tag } from "@/types/Tag";
import { Experience } from "@/types/Experience";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import ExperienceCard from "@/components/pages/experiences/browse/ExperienceCard";
import LocationSearch from "@/components/universal/LocationSearch";
import ExperienceSearch from "@/components/pages/experiences/browse/ExperienceSearch";
import TagFilter from "@/components/pages/experiences/TagFilter";
import { Label } from "@radix-ui/react-label";
import { useSearchParams } from "next/navigation";
import { City } from "@/types/City";
import TagsAPI from "@/api/TagsAPI";
import CreateExperienceDialog from "@/components/pages/experiences/CreateExperienceDialog";

export default function BrowseExperiencesWrapper() {
  // Wrap the page in Suspense to avoid linting errors due to using `useSearchParams` outside of a component
  return (
    <Suspense fallback={<div>Loading experiences...</div>}>
      <BrowseExperiences />
    </Suspense>
  );
}

function BrowseExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]); // State variable to store experiences fetched from the API
  const [tags, setTags] = useState<Tag[]>([]); // State variable to store tags fetched from the API
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // State variable to store selected tags
  const [locationSearch, setLocationSearch] = useState<City | null>(null); // State variable to store search query for location
  const [searchQuery, setSearchQuery] = useState<string>(""); // State variable to store search query for experiences
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(""); // State variable to store debounced search query
  const [isInitialMount, setIsInitialMount] = useState(true); // State to track initial render of the component

  // Initialize searchParams hook
  const searchParams = useSearchParams();

  // Fetch data on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
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
            "",
            city?.type,
            city?.city_id
          );

        setExperiences(fetchedExperiences);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitialMount(false);
      }
    };

    void fetchInitialData();
  }, [searchParams]);

  // Re-fetch experiences whenever filters or debounced query change
  useEffect(() => {
    if (isInitialMount) return; // Skip on initial mount

    const fetchFilteredExperiences = async () => {
      try {
        const tagNames = selectedTags.map((tag) => tag.name);
        const locationType = locationSearch?.type; // "city" or "country"
        const locationId = locationSearch?.city_id;

        const fetchedExperiences =
          await ExperiencesAPI.getExperiencesWithFilters(
            tagNames,
            debouncedSearchQuery,
            locationType,
            locationId
          );

        setExperiences(fetchedExperiences || []);
      } catch (error) {
        console.error("Failed to fetch filtered experiences:", error);
      }
    };

    void fetchFilteredExperiences();
  }, [selectedTags, debouncedSearchQuery, locationSearch, isInitialMount]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery); // Update debounced value after delay
    }, 400); // 400ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [searchQuery]); // Trigger when `searchQuery` changes

  // Function to toggle a tag
  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Browse Experiences</h1>
        <CreateExperienceDialog />
      </div>

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
            placeholder="Where are you going?"
            defaultCity={
              searchParams.get("cityObject")
                ? JSON.parse(
                    decodeURIComponent(searchParams.get("cityObject")!)
                  )
                : null
            }
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
          <ExperienceSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
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
