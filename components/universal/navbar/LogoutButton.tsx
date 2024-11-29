"use client";

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
        onClick={(e) => {
          submitLogout();
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Log Out
      </Button>
    </>
  );
};
