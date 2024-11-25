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

interface LocationSearchProps {
  isForForm?: boolean; // Determines if this component is being used in a form
  value: string; // Default value for the input
  onChange: (value: string) => void; // For controlled input
}

export default function LocationSearch({
  isForForm = false,
  value,
  onChange,
}: LocationSearchProps) {
  // State to manage the dropdown open
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Ref to the command dropdown
  const commandRef = useRef<HTMLDivElement | null>(null);

  // Use ffect to close dropdown when clicking outside
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

  // Determine placeholder text based on whether it's for a form
  const placeholderText = isForForm
    ? "Where is this for?"
    : "Where are you going?";

  return (
    <div className="relative w-full" ref={commandRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={placeholderText}
          value={value} // Controlled input
          onValueChange={(input) => {
            onChange(input);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && (
          <CommandList className="absolute top-full mt-2 w-full z-10 bg-background rounded-lg border shadow-md">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {locations
                .filter((loc) =>
                  loc.toLowerCase().includes(value.toLowerCase())
                )
                .map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => {
                      onChange(location);
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
