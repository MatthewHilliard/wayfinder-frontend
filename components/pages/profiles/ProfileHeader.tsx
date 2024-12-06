import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/User";
import EditProfileDialog from "./EditProfileDialog";

type ProfileHeaderProps = {
  user: User;
  currentUserId: string | null;
};

export default function ProfileHeader({
  user,
  currentUserId,
}: ProfileHeaderProps) {
  const initialData = {
    name: user.name,
    profilePicture: user.profile_picture_url || null,
    city_info: user.city_info,
  };

  return (
    <Card className="mb-8">
      <CardContent className="flex flex-col md:flex-row items-center p-6">
        <Avatar className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-0 md:mr-6">
          <AvatarImage src={user.profile_picture_url} alt={user.name} />
          <AvatarFallback className="text-4xl">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="mb-2">
              📍 {user.city_info?.name ? `${user.city_info.name}, ` : ""}
              {user.country_info.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Joined: {new Date(user.date_joined).toLocaleDateString()}
            </p>
          </div>
          {currentUserId && currentUserId === user.id && (
            <EditProfileDialog initialData={initialData} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
