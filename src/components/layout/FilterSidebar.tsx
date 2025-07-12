"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { globalFilters } from "@/constants/data";
import { Button } from "../ui/button";
import { slugify } from "@/lib/utils";
import { FilterOptions } from "./FilterOptions";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    prix: string[];
    categories: string[];
    goldTypes: string[];
    marques: string[];
    //types: string[];
  };
}

export default function FilterSidebar({ isOpen, onClose, filters }: FilterSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isCategoryPage = pathname.startsWith("/products/") && pathname.split("/").length > 2;
  const showCategoryFilter = !isCategoryPage;

  const allFilterTabs = useMemo(() => [
    { title: "Prix", options: filters.prix },
    { title: "Catégories", options: filters.categories },
    { title: "Type d’or", options: filters.goldTypes },
    { title: "Marque", options: filters.marques },
    //{ title: "Type", options: filters.types },
  ], [filters]);

  const filteredTabs = useMemo(() => {
    return allFilterTabs.filter(
      (f) => showCategoryFilter || slugify(f.title) !== "categories"
    );
  }, [allFilterTabs, showCategoryFilter]);

  const [activeTab, setActiveTab] = useState(() => filteredTabs[0]?.title || "");
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [containerHeight, setContainerHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeFilter = filteredTabs.find((f) => f.title === activeTab);

  useEffect(() => {
    if (!filteredTabs.length) return;
    const initialFilters: { [key: string]: string[] } = {};
    filteredTabs.forEach((filter) => {
      const key = slugify(filter.title);
      const paramValue = searchParams.get(key);
      if (paramValue) {
        initialFilters[key] = paramValue.split(",");
      }
    });
    setSelectedFilters(initialFilters);
  }, [searchParams, filteredTabs]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setContainerHeight(contentRef.current.scrollHeight);
    } else {
      setContainerHeight(0);
    }
  }, [isOpen]);

  const handleCheckboxChange = (category: string, value: string) => {
    const key = slugify(category);
    const val = slugify(value);

    setSelectedFilters((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];

      return { ...prev, [key]: updated };
    });
  };

  const clearFilters = () => {
  const params = new URLSearchParams(searchParams.toString());

  // Remove only filter-related keys
  filteredTabs.forEach((filter) => {
    params.delete(slugify(filter.title));
  });

  replace(`${pathname}?${params.toString()}`);
  setSelectedFilters({});
  onClose();
};


  const applyFilters = () => {
  const params = new URLSearchParams();

  Object.entries(selectedFilters).forEach(([key, values]) => {
  if (Array.isArray(values) && values.length > 0) {
    params.set(key, values.join(","));
  }
});


  replace(`${pathname}?${params.toString()}`);
  onClose();
};


  return (
    <div className="overflow-hidden transition-all duration-500 mt-8" style={{ height: containerHeight }}>
      <div
        ref={contentRef}
        className="container mx-auto flex h-[400px] rounded-lg border border-[#D9D9D9] shadow-md"
      >
        {/* Tabs */}
        <aside className="w-[342px] bg-[#F3F3F3] flex flex-col items-start">
          {filteredTabs.map(({ title }) => (
            <button
              key={title}
              onClick={() => setActiveTab(title)}
              className={`w-full px-8 py-3 text-start text-sm font-medium ${
                activeTab === title ? "bg-white" : ""
              }`}
            >
              {title}
            </button>
          ))}
        </aside>

        {/* Filter Options */}
        <section className="relative w-full p-5">
          <h4 className="mb-2 text-sm font-semibold capitalize">{activeFilter?.title}</h4>

          <FilterOptions
            filter={activeFilter?.title || ""}
            options={activeFilter?.options || []}
            selectedFilters={selectedFilters}
            onChange={handleCheckboxChange}
          />

          <div className="absolute bottom-6 right-6 flex gap-4">
            <Button
              variant="ghost"
              className="px-6 text-muted-foreground border border-border hover:bg-muted"
              onClick={clearFilters}
            >
              Clear
            </Button>
            <Button
              onClick={applyFilters}
              variant="ghost"
              className="px-12 text-primary border border-primary hover:bg-primary hover:text-white"
            >
              Filter
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
