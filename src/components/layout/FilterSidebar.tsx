"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { slugify } from "@/lib/utils";
import { FilterOptions } from "./FilterOptions";
import { Button } from "../ui/button";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    prix: string[];
    categories: string[];
    goldTypes: string[];
    marques: string[];
  };
}

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
}: FilterSidebarProps) {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isCategoryPage =
    pathname.startsWith("/products/") && pathname.split("/").length > 2;
  const showCategoryFilter = !isCategoryPage;

  const allFilterTabs = useMemo(
    () => [
      { title: "Prix", options: filters.prix },
      { title: "Catégories", options: filters.categories },
      { title: "Type d’or", options: filters.goldTypes },
      { title: "Marque", options: filters.marques },
    ],
    [filters]
  );

  const filteredTabs = useMemo(() => {
    return allFilterTabs.filter(
      (f) => showCategoryFilter || slugify(f.title) !== "categories"
    );
  }, [allFilterTabs, showCategoryFilter]);

  const [activeTab, setActiveTab] = useState(
    () => filteredTabs[0]?.title || ""
  );
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
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
    filteredTabs.forEach((filter) => {
      params.delete(slugify(filter.title));
    });

    replace(`${pathname}?${params.toString()}`);
    setSelectedFilters({});
    onClose();
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`);
    onClose();
  };

  return (
    <div
      className="overflow-hidden transition-all duration-500 mt-8"
      style={{ height: containerHeight }}
    >
      <div
        ref={contentRef}
        className="container mx-auto flex h-[400px] rounded-lg border border-[#D9D9D9] shadow-md"
      >
        {/* Tabs */}
        <aside className="w-[180px] md:w-[342px] bg-[#F3F3F3] flex flex-col items-start">
          {filteredTabs.map(({ title }) => (
            <button
              key={title}
              onClick={() => setActiveTab(title)}
              className={`w-full px-3 md:px-8 py-3 text-start text-xs md:text-sm font-medium ${
                activeTab === title ? "bg-white" : ""
              }`}
            >
              {title}
            </button>
          ))}
        </aside>

        {/* Filter Options */}
        <section className="relative w-full p-2 md:p-5">
          <h4 className="mb-2 text-xs md:text-sm font-semibold capitalize">
            {activeFilter?.title}
          </h4>

          <FilterOptions
            filter={activeFilter?.title || ""}
            options={activeFilter?.options || []}
            selectedFilters={selectedFilters}
            onChange={handleCheckboxChange}
          />

          <div className="absolute bottom-6 right-2 sm:right-6 flex gap-2">
            <Button variant={"outline"} className=" px-2 sm:px-6 " onClick={clearFilters} >
              Clear
            </Button>
            <Button onClick={applyFilters} className="px-3 sm:px-12">
              Filter
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
