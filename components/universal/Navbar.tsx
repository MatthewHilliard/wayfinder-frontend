import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Compass, MapPin, MessageCircle, User, Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const navigationItems = [
    { name: "Experiences", href: "/experiences/browse", icon: Compass },
    { name: "Destinations", href: "/destinations/browse", icon: MapPin },
    { name: "Tips & Advice", href: "/tips/browse", icon: MessageCircle },
  ];

  return (
    <header className="shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex justify-start pl-4">
            <Link href="/" className="flex items-center">
              <Image src="/wayfinder_logo.png" alt="Wayfinder logo" width={48} height={48}/>
              <span className="ml-2 text-2xl font-bold text-primary-foreground">
                Wayfinder
              </span>
            </Link>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
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
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md"
                  >
                    <User className="mr-3 h-6 w-6" />
                    Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
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
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="User avatar"
                      />
                      <AvatarFallback className="bg-accent">U</AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/profile"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Profile
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View and edit your profile
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/logout"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Log out
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Sign out of your account
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
