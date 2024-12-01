import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Compass, MessageCircle, Menu } from "lucide-react";
import Image from "next/image";
import { getUserId } from "@/lib/actions";
import UserDropdown from "./UserDropdown";

export default async function Navbar() {
  // Get the user ID from the session cookie
  const userId = await getUserId();
  // Specify the navigation items to display in the navbar
  const navigationItems = [
    { name: "Experiences", href: "/experiences/browse", icon: Compass },
    { name: "Tips & Advice", href: "/tips/browse", icon: MessageCircle },
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

          {/* Condensed Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md"
                    >
                      <item.icon className="mr-3 h-6 w-6" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Full Navigation */}
          <NavigationMenu className="hidden md:flex ml-auto mr-6">
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
