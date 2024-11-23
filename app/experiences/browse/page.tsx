"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tag } from "@/types/Tag";
import TagsAPI from "@/api/TagsAPI";
import { Experience } from "@/types/Experience";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import ExperienceCard from "@/components/pages/experiences/browse/ExperienceCard";

export default function BrowseExperiences() {
  // State variable to store experiences loading state
  const [experiencesLoading, setExperiencesLoading] = useState<boolean>(true);
  // State variable to store experiences fetched from the API
  const [experiences, setExperiences] = useState<Experience[]>([]);
  // State variable to store tags fetched from the API
  const [tags, setTags] = useState<Tag[]>([]);
  // State variable to store selected tags
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await TagsAPI.getAllTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

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

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Browse Experiences</h1>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search experiences or locations..."
          // onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 text-card-foreground placeholder:text-muted"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag.tag_id}
              variant={selectedTags.includes(tag) ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.experience_id}
            experience={experience}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
