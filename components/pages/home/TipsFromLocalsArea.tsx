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
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Hiroshi",
    location: "Kyoto, Japan",
    tip: "Try the matcha ice cream at Gion Tsujiri — it's a local favorite!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Maria",
    location: "Barcelona, Spain",
    tip: "Skip the overcrowded Park Güell and visit the Horta Labyrinth, a peaceful park with beautiful greenery and fewer tourists. It’s a hidden gem for those wanting a quieter escape.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Luca",
    location: "Rome, Italy",
    tip: "The Roman Forum is an underrated site with amazing history and fewer crowds than the Colosseum. Watch out for restaurants around the Trevi Fountain — they tend to overcharge unsuspecting tourists.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emma",
    location: "Sydney, Australia",
    tip: "Take the ferry to Manly for stunning views of the Harbour Bridge and Opera House.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Angelo",
    location: "Mexico City, Mexico",
    tip: "For authentic tacos, head to El Vilsito after midnight, a local favorite that serves the best late-night tacos. Avoid eating at touristy spots around Zócalo, as the food tends to be overpriced and less authentic.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Olivia",
    location: "New York, USA",
    tip: "The High Line is a must-see — a scenic elevated park with art installations and great views of the city.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Saad",
    location: "Cairo, Egypt",
    tip: "Beyond the pyramids, explore the tombs in Saqqara for a more authentic and quiet experience away from the crowds. Be cautious near the pyramids at night; some areas can be sketchy, and it's best to avoid wandering alone.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nina",
    location: "Berlin, Germany",
    tip: "The East Side Gallery is a fantastic piece of history, showcasing art on a remaining section of the Berlin Wall.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Ana",
    location: "Lisbon, Portugal",
    tip: "Head to Alfama for traditional Fado music and winding streets filled with character. Watch out for the pricey tourist cafes around Baixa — they often charge double for a coffee compared to locals' spots.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Chloe",
    location: "London, UK",
    tip: "Skip the overhyped Covent Garden for a more authentic experience and explore the hidden treasures around Neal's Yard.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nina",
    location: "Munich, Germany",
    tip: "Visit Viktualienmarkt for a true taste of Munich’s food culture, offering delicious local delicacies and craft beers. Be cautious during Oktoberfest, as the crowds can get overwhelming and the food and drinks can be overpriced around the festival grounds.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

// Create the TipsFromLocalsArea component to display the tips
export default function TipsFromLocalsArea() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Tips from Locals
        </h2>

        <Marquee className="[--duration:40s]">
          <div className="flex gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="flex-shrink-0 w-64">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={tip.avatar} alt={tip.name} />
                      <AvatarFallback>{tip.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{tip.name}</CardTitle>
                      <CardDescription>{tip.location}</CardDescription>
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
      </div>
    </section>
  );
}
