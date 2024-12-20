/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component displays a card for individual ratings, including the user profile 
 * information, rating value, comment, and the date it was posted. It uses reusable components 
 * such as `Avatar`, `Card`, and `Link` for a consistent UI. Star icons represent the numeric 
 * rating visually, and the user profile links to their details. The component is styled for 
 * responsiveness and accessibility.
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/types/Rating";
import { Star } from "lucide-react";
import Link from "next/link";

interface RatingCardProps {
  rating: Rating;
}

export default function RatingCard({ rating }: RatingCardProps) {
  return (
    <Card key={rating.rating_id}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Link href={`/profiles/${rating.user_info.id}`}>
            <div className="flex items-center cursor-pointer">
              <Avatar className="w-10 h-10 mr-4">
                <AvatarImage
                  src={rating.user_info.profile_picture}
                  alt={rating.user_info.name}
                />
                <AvatarFallback>
                  {rating.user_info.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{rating.user_info.name}</h3>
                {rating.rating_value && (
                  <div className="flex items-center">
                    {Array.from({ length: rating.rating_value }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          fill="#1d492e"
                          strokeWidth={0}
                          className="w-4 h-4 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
          <span className="ml-auto text-sm text-gray-500">
            {new Date(rating.date_posted).toLocaleDateString()}
          </span>
        </div>
        <p>{rating.comment}</p>
      </CardContent>
    </Card>
  );
}
