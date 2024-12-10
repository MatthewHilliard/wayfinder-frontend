/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This `TagFilter` component renders a list of selectable tags in the form of badges. 
 * It supports toggling tags for filtering or selection purposes and can be used in both forms and filters. 
 * The component dynamically updates the appearance of selected tags and triggers the provided `onToggleTag` 
 * callback when a tag is clicked.
 */

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tag } from "@/types/Tag";

interface TagFilterProps {
  tags: Tag[];
  selectedTags: Tag[];
  onToggleTag: (tag: Tag) => void;
  isForForm?: boolean;
}

export default function TagFilter({
  tags,
  selectedTags,
  onToggleTag,
  isForForm = false,
}: TagFilterProps) {
  return (
    <div className="mb-4">
      {/* Label for the filter */}
      <Label className="text-sm font-medium mb-2 block">
        {isForForm ? "Select Tags (optional)" : "Filter by Tags"}
      </Label>

      {/* List of tags, with each tag mapped to a badge */}
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
