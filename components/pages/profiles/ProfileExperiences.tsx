"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Experience } from "@/types/Experience";
import { Star } from "lucide-react";
import CreateExperienceDialog from "@/components/pages/experiences/CreateExperienceDialog";

type ProfileExperiencesProps = {
  experiences: Experience[] | null;
};

export default function ProfileExperiences({
  experiences,
}: ProfileExperiencesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiences</CardTitle>
      </CardHeader>
      <CardContent>
        {experiences && experiences.length > 0 ? (
          <ul className="space-y-4">
            {experiences.map((experience) => (
              <li
                key={experience.experience_id}
                className="border-b pb-4 last:border-b-0"
              >
                <h3 className="font-semibold">{experience.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {experience.location}
                </p>
                <div className="flex items-center mt-1">
                  <Star
                    fill="#1d492e"
                    strokeWidth={0}
                    className="w-2 h-2 mr-1"
                  />
                  <span>{experience.average_rating}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p>No experiences yet.</p>
            <CreateExperienceDialog />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
