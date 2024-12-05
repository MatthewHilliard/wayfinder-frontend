"use client";

import WordFadeIn from "@/components/ui/word-fade-in";
import LocationSearch from "@/components/universal/LocationSearch";
import { City } from "@/types/City";
import { useRouter } from "next/navigation";

export default function HomePageSearchArea() {
  const router = useRouter();

  // Function to handle city selection
  const handleCitySelect = (city: City | null) => {
    if (city) {
      // Serialize the city object into a query parameter
      const cityQuery = encodeURIComponent(JSON.stringify(city));
      router.push(`/experiences/browse?cityObject=${cityQuery}`);
    }
  };

  return (
    <section className="bg-background-colored text-primary-foreground py-20">
      {/* Container for the search area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Text for this area */}
        <WordFadeIn
          className="mb-6"
          words="Discover Unique Local Experiences"
        />
        <p className="text-xl mb-8 text-secondary-foreground">
          Explore the world through the eyes of locals
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto flex">
          <LocationSearch
            placeholder="Where are you going?"
            onSelect={handleCitySelect}
          />
        </div>
      </div>
    </section>
  );
}
