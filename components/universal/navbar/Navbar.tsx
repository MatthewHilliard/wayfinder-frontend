/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component defines the `Navbar` for the Wayfinder application. It dynamically 
 * adjusts navigation items based on the user's authentication status, displaying options such as 
 * "Experiences," "Tips & Advice," and "Wishlists" for logged-in users. The navbar includes a logo, 
 * navigation links, and a user dropdown for account actions, ensuring an intuitive and responsive 
 * user experience.
 */

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Compass, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import { getUserId } from "@/lib/actions";
import UserDropdown from "./UserDropdown";

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export default async function Navbar() {
  // Get the user ID from the session cookie
  const userId = await getUserId();

  // Specify the navigation items to display in the navbar
  const navigationItems: NavigationItem[] = [
    { name: "Experiences", href: "/experiences/browse", icon: Compass },
    { name: "Tips & Advice", href: "/tips/browse", icon: MessageCircle },
    ...(userId
      ? [{ name: "Wishlists", href: "/wishlists/browse", icon: Heart }]
      : []),
  ];

  return (
    <header className="shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="flex justify-start pl-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/wayfinder_logo.png"
                alt="Wayfinder logo"
                width={0}
                height={0}
                sizes="60px"
                className="w-full h-auto"
              />
              <span className="ml-2 text-2xl font-bold text-primary-foreground">
                Wayfinder
              </span>
            </Link>
          </div>

          {/* Full Navigation */}
          <NavigationMenu className="ml-auto mr-6">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    href={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Dropdown */}
          <UserDropdown userId={userId} />
        </div>
      </div>
    </header>
  );
}
