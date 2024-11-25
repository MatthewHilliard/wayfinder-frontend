import LocationsAPI from "@/api/LocationsAPI";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { City } from "@/types/City";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LocationSearchProps {
  isForForm?: boolean; // Determines if this component is being used in a form
  defaultValue?: string; // Default value for the input
  onSelect: (value: string) => void; // For controlled input
}

export default function LocationSearch({
  isForForm = false,
  defaultValue = "",
  onSelect,
}: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage dropdown visibility
  const [cities, setCities] = useState<City[]>([]); // State to hold fetched cities
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [searchValue, setSearchValue] = useState<string>(defaultValue); // Local state for search input
  const commandRef = useRef<HTMLDivElement | null>(null); // Ref to the command dropdown

  // Use effect to close dropdown when clicking outside
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

  // Fetch cities from the backend when the input value changes
  useEffect(() => {
    setLoading(true);
    const fetchCities = async () => {
      try {
        const fetchedCities = await LocationsAPI.citySearch(searchValue);
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchCities, 300); // Debounce API calls
    return () => clearTimeout(debounceFetch);
  }, [searchValue]);

  // Determine placeholder text based on whether it's for a form
  const placeholderText = isForForm
    ? "Where is this located?"
    : "Where are you going?";

  return (
    <div className="relative w-full" ref={commandRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={placeholderText}
          onValueChange={(input) => {
            setSearchValue(input);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && (
          <CommandList className="absolute top-full mt-2 w-full z-10 bg-background rounded-lg border shadow-md">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.city_id}
                  onSelect={() => {
                    onSelect(`${city.name}, ${city.region}, ${city.country}`);
                    setIsOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {`${city.name}, ${city.region}, ${city.country}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
