import { Input } from "@/components/ui/input";

export default function ExperienceSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      type="text"
      placeholder="What do you want to do?"
      value={value || ""}
      onChange={onChange}
      className="mb-4 h-10 text-card-foreground placeholder:text-muted"
    />
  );
}
