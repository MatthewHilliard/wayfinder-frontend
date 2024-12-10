"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component provides a `LogoutButton` that handles user logout functionality. 
 * It resets authentication cookies, redirects the user to the homepage, and displays a toast 
 * notification confirming successful logout, ensuring a smooth and intuitive user experience.
 */

import { useRouter } from "next/navigation";
import { resetAuthCookies } from "../../../lib/actions";
import { Button } from "../../ui/button";
import { toast } from "@/hooks/use-toast";

export const LogoutButton = () => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    router.push("/");

    toast({
      title: "Logged out",
      description: "You have successfully logged out",
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          submitLogout();
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Log Out
      </Button>
    </>
  );
};
