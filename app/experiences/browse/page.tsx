"use client";

import { useEffect, useState } from "react";
import { Tag } from "@/types/Tag";
import TagsAPI from "@/api/TagsAPI";
import { Experience } from "@/types/Experience";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import ExperienceCard from "@/components/pages/experiences/browse/ExperienceCard";
import LocationSearch from "@/components/universal/LocationSearch";
import ExperienceSearch from "@/components/pages/experiences/browse/ExperienceSearch";
import TagFilter from "@/components/pages/experiences/browse/TagFilter";
import { Label } from "@radix-ui/react-label";

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
  const [locationSearch, setLocationSearch] = useState<string>("");

  // UseEffect hook to run on component mount
  useEffect(() => {
    // Function to fetch tags from the API
    const fetchTags = async () => {
      try {
        const fetchedTags = await TagsAPI.getAllTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    // Function to fetch experiences from the API
    const fetchExperiences = async () => {
      try {
        setExperiencesLoading(true);
        const fetchedExperiences = await ExperiencesAPI.getAllExperiences();
        setExperiences(fetchedExperiences);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
      setExperiencesLoading(false);
    };

    void fetchTags();
    void fetchExperiences();
  }, []);

  // Fetch experiences whenever one of the search filters change
  useEffect(() => {
    // Define function to fetch experiences with search filters
    const fetchFilteredExperiences = async () => {
      try {
        setExperiencesLoading(true);
        const tagNames = selectedTags.map((tag) => tag.name); // Extract tag names
        const fetchedExperiences =
          await ExperiencesAPI.getExperiencesWithFilters(tagNames);
        setExperiences(fetchedExperiences);
      } catch (error) {
        console.error("Failed to fetch filtered experiences:", error);
      } finally {
        setExperiencesLoading(false);
      }
    };

    void fetchFilteredExperiences();
  }, [selectedTags]);

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
            value={locationSearch}
            onChange={(newLocation) => setLocationSearch(newLocation)}
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
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.experience_id}
            experience={experience}
          />
        ))}
      </div>
    </div>
  );
}
