import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tag } from "@/types/Tag";

interface TagFilterProps {
  tags: Tag[];
  selectedTags: Tag[];
  onToggleTag: (tag: Tag) => void;
}

export default function TagFilter({ tags, selectedTags, onToggleTag }: TagFilterProps) {
  return (
    <div className="mb-4">
      <Label className="text-sm font-medium mb-2 block">Filter by Tags</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.tag_id}
            variant={selectedTags.includes(tag) ? "secondary" : "outline"}
            className="cursor-pointer"
            onClick={() => onToggleTag(tag)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
