/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component, `PriceSelect`, renders a dropdown menu for selecting a price range 
 * (Free, Cheap, Moderate, Expensive). It utilizes a customizable `Select` component from the UI library 
 * and supports controlled inputs with `value` and `onChange` props for seamless integration with forms 
 * or filters.
 */

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRICE_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "cheap", label: "Cheap" },
  { value: "moderate", label: "Moderate" },
  { value: "expensive", label: "Expensive" },
];

export function PriceSelect({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a price range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Price</SelectLabel>
          {PRICE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
