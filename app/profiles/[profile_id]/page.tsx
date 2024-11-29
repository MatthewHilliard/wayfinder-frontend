"use client";

import UsersAPI from "@/api/UsersAPI";
import { User } from "@/types/User";
import { UUID } from "crypto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  // State variable to store the user
  const [user, setUser] = useState<User | null>(null);
  // State variable to store the user loading state
  const [userLoading, setUserLoading] = useState<boolean>(true);

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
      }
      setUserLoading(false);
    };

    void fetchUserById();
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

  return <h1>{user.email}</h1>;
}
