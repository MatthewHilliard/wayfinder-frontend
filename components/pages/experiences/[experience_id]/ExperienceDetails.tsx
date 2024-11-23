import { format } from "date-fns";
import { User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Experience } from "@/types/Experience" // Assume this type is defined based on the provided interface

export function ExperienceDetails({ experience }: { experience: Experience }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">About this experience</h2>
      <div className="flex items-center mb-4">
        <Avatar className="mr-2">
          <AvatarImage src={experience.creator.profile_picture_url} alt={experience.creator.name} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{experience.creator.name}</p>
          <p className="text-sm text-gray-600">
            Posted on {format(new Date(experience.date_posted), "MMMM d, yyyy")}
          </p>
        </div>
      </div>
      <p className="text-gray-700">{experience.description}</p>
    </div>
  )
}

