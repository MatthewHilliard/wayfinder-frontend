import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command";
  import { MapPin } from "lucide-react";
  import { useEffect, useRef, useState } from "react";
  
  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "San Francisco, CA",
    "Miami, FL",
    "Seattle, WA",
    "Boston, MA",
    "Austin, TX",
    "Nashville, TN",
  ];
  
  // Location search component
  export default function LocationSearch() {
    const [searchInput, setSearchInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Ref to the command dropdown
    const commandRef = useRef<HTMLDivElement | null>(null);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          commandRef.current &&
          !commandRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className="relative w-full" ref={commandRef}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            className="placeholder:text-muted"
            placeholder="Where are you going?"
            value={searchInput}
            onValueChange={setSearchInput}
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && (
            <CommandList className="absolute top-full mt-2 w-full z-10 bg-background rounded-lg border shadow-md">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => {
                      setSearchInput(location);
                      setIsOpen(false);
                    }}
                  >
                      <MapPin className="mr-2 h-4 w-4" />
                      {location}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>
    );
  }
  