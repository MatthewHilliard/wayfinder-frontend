"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UsersAPI from "@/api/UsersAPI";
import { User } from "@/types/User";
import { UUID } from "crypto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Experience } from "@/types/Experience";
import { Star } from "lucide-react";
import CreateExperienceDialog from "@/components/pages/experiences/CreateExperienceDialog";
import CreateTipDialog from "@/components/pages/experiences/CreateTipDialog";
import ProfileHeader from "@/components/pages/profiles/ProfileHeader";
import ProfileExperiences from "@/components/pages/profiles/ProfileExperiences";
import ProfileTips from "@/components/pages/profiles/ProfileTips";
import { Tip } from "@/types/Tips";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import TipsAPI from "@/api/TipsAPI";

export default function ProfilePage() {
  // State variable to store the user
  const [user, setUser] = useState<User | null>(null);
  // State variable to store the user loading state
  const [userLoading, setUserLoading] = useState<boolean>(true);
  // State variable to store the user's experiences
  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  // State variable to store the experience loading state
  const [experiencesLoading, setExperiencesLoading] = useState<boolean>(true);
  // State variable to store the user's travel tips
  const [tips, setTips] = useState<Tip[] | null>(null);
  // State variable to store the travel tips loading state
  const [tipsLoading, setTipsLoading] = useState<boolean>(true);

  // Get profile_id from the URL
  const params = useParams();
  const profile_id = Array.isArray(params.profile_id)
    ? params.profile_id[0]
    : params.profile_id; // Ensure profile_id is a string

  // UseEffect hook to run on component mount
  useEffect(() => {
    // Function to fetch user from the API
    const fetchUserById = async () => {
      try {
        setUserLoading(true);
        const fetchedUser = await UsersAPI.getUserById(profile_id as UUID);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setUserLoading(false);
      }
    };

    // Function to fetch user's experiences from the API
    const fetchExperiencesByUserId = async () => {
      try {
        setExperiencesLoading(true);
        const fetchedExperiences = await ExperiencesAPI.getExperiencesByUserId(
          profile_id as UUID
        );
        setExperiences(fetchedExperiences);
      } catch (error) {
        console.error("Failed to fetch user's experiences:", error);
      } finally {
        setExperiencesLoading(false);
      }
    };

    // Function to fetch user's travel tips from the API
    const fetchTipsByUserId = async () => {
      try {
        setTipsLoading(true);
        const fetchedTips = await TipsAPI.getTipsByUserId(profile_id as UUID);
        setTips(fetchedTips);
      } catch (error) {
        console.error("Failed to fetch user's travel tips:", error);
      } finally {
        setTipsLoading(false);
      }
    };

    void fetchUserById();
    void fetchExperiencesByUserId();
    void fetchTipsByUserId();
  }, [profile_id]);

  if (userLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>User not found. Please check the URL or try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Experiences */}
        <ProfileExperiences experiences={experiences} />

        {/* Profile Travel Tips */}
        <ProfileTips tips={tips} />
      </div>
    </div>
  );
}
