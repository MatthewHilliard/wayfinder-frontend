"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a detailed page for an individual experience. It includes 
 * information such as the title, description, location, price, tags, average rating, and associated 
 * user ratings. The page also features actions to add the experience to a wishlist and submit a rating, 
 * as well as a map displaying the location of the experience. Data is dynamically fetched using APIs 
 * for experiences and ratings.
 */

import Image from "next/image";
import { Star, MapPin, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import { UUID } from "crypto";
import { Experience } from "@/types/Experience";
import { formatLocation } from "@/lib/locationHelpers";
import RatingCard from "@/components/pages/experiences/[experience_id]/RatingCard";
import { Rating } from "@/types/Rating";
import LocationMap from "@/components/pages/experiences/[experience_id]/LocationMap";
import RatingsAPI from "@/api/RatingsAPI";
import CreateRatingDialog from "@/components/pages/experiences/[experience_id]/CreateRatingDialog";
import AddToWishlistButton from "@/components/pages/experiences/[experience_id]/AddToWishlistButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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
    const fetchRatings = async () => {
      try {
        const fetchedRatings = await RatingsAPI.getExperienceRatings(
          experience_id as UUID
        );
        setRatings(fetchedRatings);
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
      }
    };

    void fetchExperienceById();
    void fetchRatings();
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
          {/* Title of the Experience */}
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>

          {/* User who posted the experience */}
          <div className="flex items-center mb-3">
            <Link href={`/profiles/${experience.creator_info.id}`}>
              <div className="flex items-center cursor-pointer">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={experience.creator_info.profile_picture}
                    alt={experience.creator_info.name}
                  />
                  <AvatarFallback>
                    {experience.creator_info.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold">{experience.creator_info.name}</p>
              </div>
            </Link>
          </div>

          {/* Image for the Experience, if it exists */}
          {experience.image && (
            <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={experience.image || "/city-placeholder.svg"}
                alt={experience.title}
                width={1000}
                height={562}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Description of the Experience, With Rating, Location, and Price Info */}
          <div className="flex items-center mb-4">
            <Star fill="#1d492e" strokeWidth={0} className="w-5 h-5 mr-1" />
            <span className="font-semibold mr-2">
              {experience.average_rating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              {experience.number_of_ratings} rating
              {experience.number_of_ratings > 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-lg mb-4">{experience.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{experience.location_info.city_info?.name ?? ""}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="capitalize">{experience.price}</span>
            </div>
          </div>

          {/* Tags for the Experience */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.tags.map((tag) => (
              <Badge key={tag.tag_id}>{tag.name}</Badge>
            ))}
          </div>
        </div>
        <div>
          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-4">
                <AddToWishlistButton experienceId={experience.experience_id} />
                <CreateRatingDialog experienceId={experience.experience_id} />
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <LocationMap location={experience.location_info} />
                </div>
              </div>
              <p>{formatLocation(experience.location_info)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
        <div className="space-y-6">
          {ratings && ratings.length > 0 ? (
            ratings.map((rating) => (
              <RatingCard key={rating.rating_id} rating={rating} />
            ))
          ) : (
            <p>No ratings yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
    </div>
  );
}
