import LocationsAPI from "@/api/LocationsAPI";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { formatLocation, generateKey } from "@/lib/locationHelpers";
import { City } from "@/types/City";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface LocationSearchProps {
  placeholder?: string; // Placeholder text for the input
  defaultCity?: City | null; // Default city to set
  onSelect: (city: City | null) => void; // For controlled input
}

export default function LocationSearch({
  placeholder = "",
  defaultCity = null,
  onSelect,
}: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage dropdown visibility
  const [cities, setCities] = useState<City[]>([]); // State to hold fetched cities
  const [searchValue, setSearchValue] = useState<string>(""); // Local state for search input
  const [selectedCity, setSelectedCity] = useState<City | null>(defaultCity); // State for the selected city
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
  }, [searchValue, fetchCities]);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    onSelect(city);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedCity(null);
    setIsOpen(false);
    onSelect(null); // Notify the parent component that the selection is cleared
  };

  return (
    <div className="relative w-full" ref={commandRef}>
      <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          placeholder={placeholder}
          value={searchValue}
          onValueChange={(input) => {
            setSearchValue(input);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {selectedCity && (
          <Button
            variant={"destructive"}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleClearSelection}
          >
            Clear
          </Button>
        )}

        {isOpen && (
          <CommandList className="absolute top-full mt-2 w-full z-10 bg-background rounded-lg border shadow-md">
            <CommandGroup>
              {searchValue ? (
                cities.map((city) => (
                  <CommandItem
                    key={generateKey(city)} // Dynamic key based on type and city_id
                    value={formatLocation(city)} // Set value as the dynamic key
                    onSelect={() => handleSelectCity(city)}
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
