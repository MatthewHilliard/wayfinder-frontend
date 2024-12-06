"use client";

import UsersAPI from "@/api/UsersAPI";
import { User } from "@/types/User";
import { UUID } from "crypto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Experience } from "@/types/Experience";
import ProfileHeader from "@/components/pages/profiles/ProfileHeader";
import ProfileExperiences from "@/components/pages/profiles/ProfileExperiences";
import ProfileTips from "@/components/pages/profiles/ProfileTips";
import { Tip } from "@/types/Tips";
import ExperiencesAPI from "@/api/ExperiencesAPI";
import TipsAPI from "@/api/TipsAPI";
import { getUserId } from "@/lib/actions";

export default function ProfilePage() {
  // State variable to store the user
  const [user, setUser] = useState<User | null>(null);
  // State variable to store the current user ID
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  // State variable to store the user loading state
  const [userLoading, setUserLoading] = useState<boolean>(true);
  // State variable to store the user's experiences
  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  // State variable to store the user's travel tips
  const [tips, setTips] = useState<Tip[] | null>(null);

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

    // Function to fetch the current user ID
    const fetchCurrentUserId = async () => {
      try {
        const fetchedCurrentUserId = await getUserId();
        setCurrentUserId(fetchedCurrentUserId);
      } catch (error) {
        console.error("Failed to fetch current user ID:", error);
      }
    };

    // Function to fetch user's experiences from the API
    const fetchExperiencesByUserId = async () => {
      try {
        const fetchedExperiences = await ExperiencesAPI.getExperiencesByUserId(
          profile_id as UUID
        );
        setExperiences(fetchedExperiences);
      } catch (error) {
        console.error("Failed to fetch user's experiences:", error);
      }
    };

    // Function to fetch user's travel tips from the API
    const fetchTipsByUserId = async () => {
      try {
        const fetchedTips = await TipsAPI.getTipsByUserId(profile_id as UUID);
        setTips(fetchedTips);
      } catch (error) {
        console.error("Failed to fetch user's travel tips:", error);
      }
    };

    void fetchUserById();
    void fetchCurrentUserId();
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
      <ProfileHeader user={user} currentUserId={currentUserId} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Experiences */}
        <ProfileExperiences experiences={experiences} />

        {/* Profile Travel Tips */}
        <ProfileTips tips={tips} />
      </div>
    </div>
  );
}
