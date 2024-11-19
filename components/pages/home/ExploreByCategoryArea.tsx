import { Button } from "@/components/ui/button";

export default function ExploreByCategoryArea() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Explore by Popular Categories
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Adventure", icon: "🏔️" },
            { name: "Art & Culture", icon: "🎨" },
            { name: "Food & Drink", icon: "🍽️" },
            { name: "History", icon: "🏛️" },
            { name: "Music", icon: "🎵" },
            { name: "Nature", icon: "🌿" },
            { name: "Nightlife", icon: "🍾" },
            { name: "Shopping", icon: "🛍️" },
          ].map((category, index) => (
            <Button key={index} variant="outline" className="h-24 text-lg">
              <span className="mr-2 text-2xl">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
