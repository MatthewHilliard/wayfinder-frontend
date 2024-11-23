'use client'

import ExperiencesAPI from "@/api/ExperiencesAPI";
import { AddToWishlistButton } from "@/components/pages/experiences/[experience_id]/AddToWishlistButton";
import { ExperienceDetails } from "@/components/pages/experiences/[experience_id]/ExperienceDetails";
import { Experience } from "@/types/Experience";
import { Separator } from "@radix-ui/react-select";
import { UUID } from "crypto";
import { Badge, Calendar, Clock, DollarSign, MapPin, Star, Tag } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function ExperiencePage() {
  // State variable to store experience
  const [experience, setExperience] = useState<Experience | null>(null);
  // State variable to store experiences loading state
  const [experienceLoading, setExperienceLoading] = useState<boolean>(true);

  // Get experience_id from the URL
  const params = useParams();
  const experience_id = Array.isArray(params.experience_id)
    ? params.experience_id[0]
    : params.experience_id; // Ensure experience_id is a string

  // UseEffect hook to run on component mount
  useEffect(() => {
    // Function to fetch experiences from the API
    const fetchExperienceById = async () => {
      try {
        setExperienceLoading(true);
        const fetchedExperience = await ExperiencesAPI.getExperienceById(experience_id as UUID);
        setExperience(fetchedExperience);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
      setExperienceLoading(false);
    };

    void fetchExperienceById();
  }, [experience_id]);

  if (experienceLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading experience details...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Experience not found. Please check the URL or try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold mr-2">{experience.average_rating.toFixed(1)}</span>
            <span className="text-gray-600">({experience.number_of_ratings} ratings)</span>
          </div>
          {experience.image_url && (
            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src={experience.image_url}
                alt={experience.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <p className="text-gray-700 mb-4">{experience.description}</p>
          <Separator className="my-6" />
          <ExperienceDetails experience={experience} />
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Activity Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                <span>{experience.location_info.city_info.name}, {experience.location_info.country_info.name}</span>
              </div>
              {experience.date && (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                  <span>{format(new Date(experience.date), "MMMM d, yyyy")}</span>
                </div>
              )}
              {experience.start_time && experience.end_time && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-600" />
                  <span>{`${experience.start_time} - ${experience.end_time}`}</span>
                </div>
              )}
              {experience.price && (
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="capitalize">{experience.price}</span>
                </div>
              )}
            </div>
            <Separator className="my-4" />
            <AddToWishlistButton experienceId={experience.experience_id} />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <Badge key={tag.tag_id}>
                  <Tag className="w-4 h-4 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
