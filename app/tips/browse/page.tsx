"use client";

import TipsAPI from "@/api/TipsAPI";
import CreateTipDialog from "@/components/pages/tips/CreateTipDialog";
import { TipCard } from "@/components/pages/tips/TipCard";
import { Label } from "@/components/ui/label";
import LocationSearch from "@/components/universal/LocationSearch";
import { City } from "@/types/City";
import { Tip } from "@/types/Tips";
import { useEffect, useState } from "react";

export default function BrowseTipsPage() {
  const [tips, setTips] = useState<Tip[] | null>(null); // State to store the tips fetched from the API
  const [locationSearch, setLocationSearch] = useState<City | null>(null); // Location filter

  // Fetch tips based on location
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const locationType = locationSearch?.type; // "city" or "country"
        const locationId = locationSearch?.city_id;

        const fetchedTips = await TipsAPI.getTipsWithFilters(
          locationType,
          locationId
        );
        setTips(fetchedTips || []);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    void fetchTips();
  }, [locationSearch]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Browse Travel Tips</h1>
        <CreateTipDialog />
      </div>
      {/* Location search filter */}
      <div className="mb-6">
        <Label
          htmlFor="location-search"
          className="block mb-2 text-sm font-medium"
        >
          Search by Location
        </Label>
        <LocationSearch
          placeholder="Where are you looking for tips?"
          onSelect={(newLocation) => setLocationSearch(newLocation)}
        />
      </div>

      {/* Tips list */}
      {tips && tips.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <TipCard key={tip.tip_id} tip={tip} />
          ))}
        </div>
      ) : (
        <p>No tips found for the selected location.</p>
      )}
    </div>
  );
}
