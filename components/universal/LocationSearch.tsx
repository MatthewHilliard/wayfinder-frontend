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
  defaultValue?: string; // Default value for the input
  onSelect: (city: City) => void; // For controlled input
}

export default function LocationSearch({
  defaultValue = "",
  onSelect,
}: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage dropdown visibility
  const [cities, setCities] = useState<City[]>([]); // State to hold fetched cities
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

  const fetchCities = async () => {
    try {
      const fetchedCities = await LocationsAPI.citySearch(searchValue);
      setCities(fetchedCities);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setCities([]);
    }
  };

  // Fetch cities from the backend when the input value changes
  useEffect(() => {
    const debounceFetch = setTimeout(fetchCities, 150);
    return () => clearTimeout(debounceFetch);
  }, [searchValue]);

  // Format the location string
  const formatLocation = (city: City) => {
    const parts = [city.name, city.region, city.country].filter(Boolean);
    return parts.join(", ");
  };

  // Generate the dynamic key, which ensures that country and city IDs do not collide when mapping
  const generateKey = (city: City) => {
    return `${city.type}-${city.city_id}`;
  };

  return (
    <div className="relative w-full" ref={commandRef}>
      <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          placeholder="Where are you going?"
          onValueChange={(input) => {
            setSearchValue(input);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && (
          <CommandList className="absolute top-full mt-2 w-full z-10 bg-background rounded-lg border shadow-md">
            <CommandGroup>
              {searchValue ? (
                cities.map((city) => (
                  <CommandItem
                    key={generateKey(city)} // Dynamic key based on type and city_id
                    value={generateKey(city)} // Set value as the dynamic key
                    onSelect={() => {
                      onSelect(city);
                      setIsOpen(false);
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {formatLocation(city)}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>
                  {searchValue.trim()
                    ? "No results found."
                    : "Type to search for a location!"}
                </CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
