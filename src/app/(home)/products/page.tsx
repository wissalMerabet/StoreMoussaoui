"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import type { Product } from "@/types";
import { extractUniqueFilterValues, slugify, sortProducts } from "@/lib/utils";
import { getAllProducts } from "./actions";
import {
  PRICE_RANGES,
  scrollSpeed,
  textScroll,
} from "@/constants/data";

import Reveal from "@/components/layout/Reveal";
import Card from "@/components/layout/Card";
import FilterSidebar from "@/components/layout/FilterSidebar";
import ScrollBar from "@/components/layout/ScrollBar";
import SortDropdown from "@/components/layout/SortDropdown";


const Page = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    goldTypes: [] as string[],
    brands: [] as string[],
    categories: [] as string[],
  });

  const searchParams = useSearchParams();

  //products

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getAllProducts();
        //console.log(data);
        const topProducts = data.slice(0, 8);
        setProducts(topProducts);
        const dynamicFilters = extractUniqueFilterValues(topProducts);
        setFilterOptions(dynamicFilters);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  //filter products

  useEffect(() => {
    if (!products.length) return;

    const filtersFromURL: { [key: string]: string[] } = {};
    searchParams.forEach((value, key) => {
      filtersFromURL[key] = value.split(",").map(slugify);
    });

    const filtered = products.filter((product) => {
      return Object.entries(filtersFromURL).every(([key, values]) => {
        switch (key) {
          case "type-dor":
            return values.includes(slugify(product.gold_type?.name || ""));
          case "marque":
            return values.includes(slugify(product.brand?.name || ""));
          case "categories":
            return (
              values.includes(slugify(product.category?.name || "")) ||
              values.includes("bijoux")
            );
          case "prix":
            const price = Number(product.fixed_price);
            return values.some((slug) => {
              const range = PRICE_RANGES.find((r) => slugify(r.label) === slug);
              return range ? price >= range.min && price <= range.max : true;
            });
          default:
            return true;
        }
      });
    });

    const orderBy = searchParams.get("order_by") || "created_at";
    const orderDir = searchParams.get("order_dir") || "desc";
    const sorted = sortProducts(filtered, `${orderBy}-${orderDir}`);

    setFilteredProducts(sorted);
  }, [products, searchParams]);

  if (loading) {
    return (
      <div className="text-center text-sm py-10 text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="mx-auto pt-18 sm:pt-22 md:pt-34 lg:pt-36 lg:pb-0">
      {/* Navigation */}
      <nav className="bg-[#0A142F] text-sm text-white">
        <div className="container mx-auto px-4 text-[10px] md:text-sm mb-8 py-3 flex justify-between items-center gap-2">
          <div>
            <Link href="/" className="px-1">
              Accueil
            </Link>{" "}
            /<span className="px-1">Bijoux</span>
          </div>
          <Link href="/" className="flex flex-row gap-1">
            <BsChevronLeft className="mt-0.5 md:mt-1" />
            Retour
          </Link>
        </div>
      </nav>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold">Bijoux</h1>
        <p className="text-xs md:text-[16px] mt-2 px-4">
          Moussaoui Mounir a sélectionné pour vous les plus belles pièces pour
          être à la hauteur de votre amour ! Le bijou de vos rêves vous attend
          déjà
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white text-black mt-12 py-8 px-4">
        <div className="container mx-auto flex justify-between items-center ">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="group flex items-center gap-2 md:gap-4 rounded-md border border-foreground text-xs md:text-base py-2 px-2 md:px-4 font-medium cursor-pointer "
          >
            <BiFilterAlt  />
            FILTRES
            {isFilterOpen ? <FiMinus /> : <FiPlus />}
          </button>
          <SortDropdown />
        </div>

        {isFilterOpen && (
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={{
              prix: PRICE_RANGES.map((r) => r.label),
              categories: filterOptions.categories,
              goldTypes: filterOptions.goldTypes,
              marques: filterOptions.brands,
            }}
          />
        )}

        {/* Products */}
        <Reveal>
          <div className="container mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500 col-span-full py-10">
                Aucun produit trouvé.
              </div>
            ) : (
              filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${slugify(product.category?.name)}/${slugify(
                  product.name
                )}-${product.id}`}
              >
                <Card product={product} />
              </Link>
            )))}
          </div>
        </Reveal>

        
      </div>

      <ScrollBar texts={textScroll} speed={scrollSpeed} />
    </div>
  );
};

export default Page;
