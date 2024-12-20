"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a `UserDropdown` menu that dynamically adapts to the user's 
 * authentication state. It displays profile and account options for logged-in users, including a link 
 * to their profile and a logout button. For unauthenticated users, it provides options to log in or sign up. 
 * The component fetches user details when a `userId` is provided and seamlessly integrates with the `UsersAPI`.
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SignupPopup from "./SignupPopup";
import LoginPopup from "./LoginPopup";
import { LogoutButton } from "./LogoutButton";
import { useEffect, useState } from "react";
import UsersAPI from "@/api/UsersAPI";
import { UUID } from "crypto";
import { User } from "@/types/User";

interface UserDropdownProps {
  userId: string | null;
}

export default function UserDropdown({ userId }: UserDropdownProps) {
  const [user, setUser] = useState<User | null>(null); // State to store user data fetched from the API

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UsersAPI.getUserById(userId as UUID);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (userId) {
      void fetchUser();
    }
  }, [userId]);

  return (
    <div className="hidden md:flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.profile_picture} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {userId && (
            <>
              <DropdownMenuLabel className="text-center">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center"
              >
                <Link href={`/profiles/${userId}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <div className="flex flex-col">
            {userId ? (
              <LogoutButton />
            ) : (
              <>
                <LoginPopup />
                <SignupPopup />
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
