"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Experience } from "@/types/Experience";

type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const handleCardClick = () => {
    // Open the dynamic route in a new tab
    window.open(`/experiences/${experience.experience_id}`, "_blank");
  };

  return (
    <>
      {/* Card component for the Experience */}
      <Card
        key={experience.experience_id}
        onClick={handleCardClick}
        className="flex flex-col cursor-pointer transition-transform transform hover:scale-105"
      >
        {/* Image for the Experience, if it exists */}
        {experience.image_url && (
          <div className="relative w-full h-48">
            <Image
              src={experience.image_url}
              alt={experience.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
          </div>
        )}
        {/* Header for the Experience */}
        <CardHeader>
          <CardTitle className="text-lg">{experience.title}</CardTitle>
          <CardDescription className="text-sm text-muted">
            {experience.location_info.city_info.name},{" "}
            {experience.location_info.country_info.name}
          </CardDescription>
        </CardHeader>

        {/* Content for the Experience */}
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <Badge key={tag.tag_id}>{tag.name}</Badge>
            ))}
          </div>
        </CardContent>

        {/* Footer for the Experience */}
        <CardFooter className="flex justify-between">
          {experience.number_of_ratings > 0 ? (
            <span className="text-sm">
              Rating: {experience.average_rating}/5
            </span>
          ) : (
            <span className="text-sm text-muted">No ratings yet</span>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
