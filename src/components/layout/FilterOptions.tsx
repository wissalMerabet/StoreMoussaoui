import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { slugify } from "@/lib/utils";

interface FilterOptionsProps {
  filter: string;
  options: string[];
  selectedFilters: { [key: string]: string[] };
  onChange: (category: string, value: string) => void;
}

export function FilterOptions({
  filter,
  options,
  selectedFilters,
  onChange,
}: FilterOptionsProps) {
  const key = slugify(filter);
  const selected = selectedFilters[key] || [];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {options.map((option) => {
        const val = slugify(option);
        const isChecked = selected.includes(val);

        return (
          <div key={option} className="flex items-center gap-2">
            <Checkbox
              id={`${key}-${val}`}
              checked={isChecked}
              onCheckedChange={() => onChange(filter, option)}
            />
            <Label htmlFor={`${key}-${val}`} className="text-sm">
              {option}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
