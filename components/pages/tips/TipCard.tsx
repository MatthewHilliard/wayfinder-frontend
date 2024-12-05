import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tip } from "@/types/Tips";

interface TipProps {
  tip: Tip;
}

export function TipCard({ tip }: TipProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={tip.creator_info.profile_picture_url}
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
