/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component provides a search input field for filtering experiences 
 * based on a user-provided query. The component is styled for accessibility and 
 * responsiveness, featuring a placeholder for guidance and integration with a parent 
 * component via controlled value and onChange handler.
 */

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
