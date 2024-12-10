"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This `ExploreByCategoryArea` component provides a visually engaging way for users to explore 
 * experiences by popular categories. Each category is represented by a `MagicCard` with an icon and name, 
 * and clicking a category redirects the user to a filtered browse page. The component integrates smoothly 
 * with Next.js routing and features responsive design for various screen sizes.
 */

import { MagicCard } from "@/components/ui/magic-card";
import { useRouter } from "next/navigation";

// Declare the popular categories
const categories = [
  { name: "adventure", icon: "🏔️" },
  { name: "art and culture", icon: "🎨" },
  { name: "food and drink", icon: "🍽️" },
  { name: "history", icon: "🏛️" },
  { name: "music", icon: "🎵" },
  { name: "nature", icon: "🌿" },
  { name: "nightlife", icon: "🍾" },
  { name: "shopping", icon: "🛍️" },
];

export default function ExploreByCategoryArea() {
  const router = useRouter();

  // Function to handle category selection
  const handleCategoryClick = (tagName: string) => {
    // Serialize the tag name as a query parameter
    router.push(`/experiences/browse?tag=${encodeURIComponent(tagName)}`);
  };

  return (
    <section className="py-16 bg-background">
      {/* Popular Categories Container */}
      <div className="container mx-auto">
        {/* Popular Categories Title */}
        <h2 className="mb-8 text-3xl font-bold text-center text-primary-foreground">
          Explore by Popular Categories
        </h2>

        {/* Map through the categories and display them in Magic Cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <MagicCard
              key={index}
              className="bg-card text-card-foreground cursor-pointer flex flex-col items-center justify-center shadow-2xl text-center h-40 transition-transform hover:scale-105"
              gradientColor="#D9D9D955"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">{category.icon}</span>
                <span className="text-lg font-bold">{category.name}</span>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
