"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a card for individual travel experiences. 
 * Each card includes an image, title, location details, tags, and rating information. 
 * Clicking the card opens the experience's detailed page in a new tab. 
 * The component is styled for responsiveness, interactivity, and consistent UI using 
 * reusable components such as `Card`, `Badge`, and `Image`.
 */

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
import { formatLocation } from "@/lib/locationHelpers";
import { Star } from "lucide-react";

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
        {/* Image for the Experience */}
        <div className="relative w-full h-48">
          <Image
            src={experience.image || "/city-placeholder.svg"}
            alt={experience.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority
            className="rounded-t-lg"
          />
        </div>
        {/* Header for the Experience */}
        <CardHeader>
          <CardTitle className="text-lg">{experience.title}</CardTitle>
          <CardDescription className="text-sm text-muted">
            {formatLocation(experience.location_info)}
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
            <>
              <span className="flex items-center text-sm">
                <Star fill="#1d492e" strokeWidth={0} className="w-5 h-5 mr-1" />
                {experience.average_rating.toFixed(1)}
              </span>
              <span className="text-sm">
                {experience.number_of_ratings} rating
                {experience.number_of_ratings > 1 ? "s" : ""}
              </span>
            </>
          ) : (
            <span className="text-sm text-muted">No ratings yet</span>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
