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

interface UserDropdownProps {
  userId: string | null;
}

export default function UserDropdown({ userId }: UserDropdownProps) {
  return (
    <div className="hidden md:flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage alt="User avatar" />
            <AvatarFallback className="bg-accent">U</AvatarFallback>
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
                <Link href="/profile">Profile</Link>
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
