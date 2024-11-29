"use client";

import Image from "next/image";
import { Star, MapPin, DollarSign, Heart, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import { UUID } from "crypto";
import { Experience } from "@/types/Experience";
import { formatLocation } from "@/lib/locationHelpers";
import RatingCard from "@/components/pages/experiences/[experience_id]/RatingCard";
import { Rating } from "@/types/Rating";

export default function ExperiencePage() {
  // State variable to store experience
  const [experience, setExperience] = useState<Experience | null>(null);
  // State variable to store ratings
  const [ratings, setRatings] = useState<Rating[]>([]);
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
        const fetchedExperience = await ExperiencesAPI.getExperienceById(
          experience_id as UUID
        );
        setExperience(fetchedExperience);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
      setExperienceLoading(false);
    };

    // Function to fetch ratings from the API
    // const fetchRatings = async () => {
    //   try {
    //     const fetchedRatings = await RatingsAPI.getExperienceRatings(
    //       experience_id as UUID
    //     );
    //     setRatings(fetchedRatings);
    //   } catch (error) {
    //     console.error("Failed to fetch ratings:", error);
    //   }
    // };

    void fetchExperienceById();
    // void fetchRatings();
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
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={experience.image_url || "/placeholder.svg"}
              alt={experience.title}
              width={1000}
              height={562}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold mr-2">
              {experience.average_rating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              ({experience.number_of_ratings} ratings)
            </span>
          </div>
          <p className="text-lg mb-4">{experience.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{experience.location_info.city_info.name}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="capitalize">{experience.price}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.tags.map((tag) => (
              <Badge key={tag.tag_id}>{tag.name}</Badge>
            ))}
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-4">
                <Button className="w-full">Book Now</Button>
                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Google Maps Placeholder
                </div>
              </div>
              <p>{formatLocation(experience.location_info)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-6">
          {ratings.map((rating) => (
            <RatingCard key={rating.rating_id} rating={rating} />
          ))}
        </div>
      </div>
    </div>
  );
}
