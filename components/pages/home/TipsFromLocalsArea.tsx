/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: The `TipsFromLocalsArea` component displays travel tips from locals in an engaging marquee-style 
 * scrolling section. Each tip is shown inside a card with details like the contributor's name, location, and 
 * their tip. This visually appealing section is designed to provide valuable insights while enhancing user 
 * engagement on the page.
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";

// Declare the tips to be shown in the marquee
const tips = [
  {
    name: "Sophie",
    location: "Paris, France",
    tip: "Visit the Musée d'Orsay on the first Sunday of the month for free entry. Just be mindful of pickpockets, especially around busy areas like the Eiffel Tower and Champs-Élysées.",
  },
  {
    name: "Hiroshi",
    location: "Kyoto, Japan",
    tip: "Try the matcha ice cream at Gion Tsujiri — it's a local favorite!",
  },
  {
    name: "Maria",
    location: "Barcelona, Spain",
    tip: "Skip the overcrowded Park Güell and visit the Horta Labyrinth, a peaceful park with beautiful greenery and fewer tourists. It’s a hidden gem for those wanting a quieter escape.",
  },
  {
    name: "Luca",
    location: "Rome, Italy",
    tip: "The Roman Forum is an underrated site with amazing history and fewer crowds than the Colosseum. Watch out for restaurants around the Trevi Fountain — they tend to overcharge unsuspecting tourists.",
  },
  {
    name: "Emma",
    location: "Sydney, Australia",
    tip: "Take the ferry to Manly for stunning views of the Harbour Bridge and Opera House.",
  },
  {
    name: "Angelo",
    location: "Mexico City, Mexico",
    tip: "For authentic tacos, head to El Vilsito after midnight, a local favorite that serves the best late-night tacos. Avoid eating at touristy spots around Zócalo, as the food tends to be overpriced and less authentic.",
  },
  {
    name: "Olivia",
    location: "New York, USA",
    tip: "The High Line is a must-see — a scenic elevated park with art installations and great views of the city.",
  },
  {
    name: "Saad",
    location: "Cairo, Egypt",
    tip: "Beyond the pyramids, explore the tombs in Saqqara for a more authentic and quiet experience away from the crowds. Be cautious near the pyramids at night; some areas can be sketchy, and it's best to avoid wandering alone.",
  },
  {
    name: "Nina",
    location: "Berlin, Germany",
    tip: "The East Side Gallery is a fantastic piece of history, showcasing art on a remaining section of the Berlin Wall.",
  },
  {
    name: "Ana",
    location: "Lisbon, Portugal",
    tip: "Head to Alfama for traditional Fado music and winding streets filled with character. Watch out for the pricey tourist cafes around Baixa — they often charge double for a coffee compared to locals' spots.",
  },
  {
    name: "Chloe",
    location: "London, UK",
    tip: "Skip the overhyped Covent Garden for a more authentic experience and explore the hidden treasures around Neal's Yard.",
  },
  {
    name: "Nina",
    location: "Munich, Germany",
    tip: "Visit Viktualienmarkt for a true taste of Munich's food culture, offering delicious local delicacies and craft beers. Be cautious during Oktoberfest, as the crowds can get overwhelming and the food and drinks can be overpriced around the festival grounds.",
  },
];

// Create the TipsFromLocalsArea component to display the tips
export default function TipsFromLocalsArea() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto relative">
        {/* Section Title */}
        <h2 className="mb-8 text-3xl font-bold text-center">
          Tips from Locals
        </h2>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <Marquee className="[--duration:80s]">
            <div className="flex gap-6">
              {/* Map each tip to a Card component displayed in the marquee */}
              {tips.map((tip, index) => (
                <Card key={index} className="flex-shrink-0 w-96">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage alt={tip.name} />
                        <AvatarFallback>{tip.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{tip.name}</CardTitle>
                        <CardDescription className="text-muted">
                          {tip.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{tip.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Marquee>

          {/* Left Gradient */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background via-background/50 to-transparent dark:from-background dark:via-background/50"></div>

          {/* Right Gradient */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background via-background/50 to-transparent dark:from-background dark:via-background/50"></div>
        </div>
      </div>
    </section>
  );
}
