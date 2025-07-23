"use client";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IoFilterSharp } from "react-icons/io5";
import { SORT_OPTIONS } from "@/constants/data";


export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const orderBy = searchParams.get("order_by");
  const orderDir = searchParams.get("order_dir");

  const currentValue = orderBy && orderDir ? `${orderBy}-${orderDir}` : null;
 
  const currentLabel = currentValue
    ? SORT_OPTIONS.find((opt) => opt.value === currentValue)?.label || "Trier"
    : "Pertinence";

  const handleSort = (value: string) => {
    const [order_by, order_dir] = value.split("-");
    const params = new URLSearchParams(searchParams.toString());

    params.set("order_by", order_by);
    params.set("order_dir", order_dir);

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center font-medium gap-2 border-none text-xs md:text-base cursor-pointer"
      >
        <IoFilterSharp />
        {currentLabel}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow border rounded w-48 z-20">
          {SORT_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSort(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
