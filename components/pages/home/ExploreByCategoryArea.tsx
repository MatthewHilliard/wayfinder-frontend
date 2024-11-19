import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { name: "Adventure", icon: "🏔️" },
  { name: "Art & Culture", icon: "🎨" },
  { name: "Food & Drink", icon: "🍽️" },
  { name: "History", icon: "🏛️" },
  { name: "Music", icon: "🎵" },
  { name: "Nature", icon: "🌿" },
  { name: "Nightlife", icon: "🍾" },
  { name: "Shopping", icon: "🛍️" },
];

export default function ExploreByCategoryArea() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-primary-foreground">
          Explore by Popular Categories
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg cursor-pointer transition-shadow bg-card text-card-foreground"
            >
              <CardHeader className="flex items-center justify-center h-24">
                <span className="text-3xl mr-2">{category.icon}</span>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
