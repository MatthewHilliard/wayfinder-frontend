"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import WordFadeIn from "@/components/ui/word-fade-in";
import LocationSearch from "@/components/universal/LocationSearch";

export default function HomePageSearchArea() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <WordFadeIn
          className="mb-6"
          words="Discover Unique Local Experiences"
        />
        <p className="text-xl mb-8 text-secondary-foreground">
          Explore the world through the eyes of locals
        </p>
        <div className="max-w-md mx-auto flex">
          <LocationSearch />
        </div>
      </div>
    </section>
  );
}
