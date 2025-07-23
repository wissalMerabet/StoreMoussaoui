import { Product } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const slugify = (str?: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};


export function sortProducts(products: Product[], sortBy: string) {
  const [key, direction] = sortBy.split("-");

  return [...products].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (key) {
      case "price":
        aValue = Number(a.fixed_price);
        bValue = Number(b.fixed_price);
        break;
      case "created_at":
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
        break;
      
      default:
        return 0;
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function extractUniqueFilterValues(products: Product[]) {
  const goldTypes = new Set<string>();
  const brands = new Set<string>();
  const categories = new Set<string>();

  categories.add("Bijoux");

  products.forEach((product) => {
    if (product.gold_type?.name) goldTypes.add(product.gold_type.name);
    if (product.brand?.name) brands.add(product.brand.name);
    if (product.category?.name) categories.add(product.category.name);
  });

  return {
    goldTypes: Array.from(goldTypes),
    brands: Array.from(brands),
    categories: Array.from(categories),
  };
}
