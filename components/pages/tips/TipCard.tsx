/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a styled card (`TipCard`) displaying details of a tip, 
 * including the content, creator's profile, date posted, and location. The card links to the 
 * creator's profile and dynamically fetches user and location data for a visually appealing 
 * presentation of tips.
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tip } from "@/types/Tips";
import Link from "next/link";

interface TipProps {
  tip: Tip;
}

export function TipCard({ tip }: TipProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link href={`/profiles/${tip.creator_info.id}`}>
          <div className="flex items-center gap-4 cursor-pointer">
            <Avatar>
              <AvatarImage
                src={tip.creator_info.profile_picture}
                alt={tip.creator_info.name}
              />
              <AvatarFallback>{tip.creator_info.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{tip.creator_info.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(tip.date_posted).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{tip.content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          📍 {tip.city_info?.name ? `${tip.city_info.name}, ` : ""}
          {tip.country_info.name}
        </p>
      </CardFooter>
    </Card>
  );
}
