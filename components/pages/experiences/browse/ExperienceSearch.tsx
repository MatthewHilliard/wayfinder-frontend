import { Input } from "@/components/ui/input";

export default function ExperienceSearch() {
  return (
    <Input
      type="text"
      placeholder="What do you want to do?"
      className="mb-4 h-10 text-card-foreground placeholder:text-muted"
    />
  );
}
