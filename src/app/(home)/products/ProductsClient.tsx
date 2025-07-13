"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { getAllProducts } from "./actions";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import Reveal from "@/components/layout/Reveal";
import Card from "@/components/layout/Card";
import { slugify } from "@/lib/utils";
import { BiFilterAlt } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import FilterSidebar from "@/components/layout/FilterSidebar";
import ScrollBar from "@/components/layout/ScrollBar";
import { scrollSpeed, SORT_OPTIONS, textScroll } from "@/constants/data";
import Pagination from "@/components/layout/Pagination";
import { IoFilterSharp } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

// Define price ranges in one place
const PRICE_RANGES = [
  { label: "Petits prix", min: 0, max: 30000 },
  { label: "Entre 30 000 DA et 80 000 DA", min: 30000, max: 80000 },
  { label: "Entre 80 000 DA et 120 000 DA", min: 80000, max: 120000 },
  { label: "Entre 120 000 DA et 200 000 DA", min: 120000, max: 200000 },
  { label: "Plus de 200 000 DA", min: 200000, max: Infinity },
];

// Extract filter options from API
function extractUniqueFilterValues(products: Product[]) {
  const goldTypes = new Set<string>();
  const brands = new Set<string>();
  //const types = new Set<string>();
  const categories = new Set<string>();

  categories.add("Bijoux");

  products.forEach((product) => {
    if (product.gold_type?.name) goldTypes.add(product.gold_type.name);
    if (product.brand?.name) brands.add(product.brand.name);
    //if (product.type?.name) types.add(product.type.name);
    if (product.category?.name) categories.add(product.category.name);
  });

  return {
    goldTypes: Array.from(goldTypes),
    brands: Array.from(brands),
    //types: Array.from(types),
    categories: Array.from(categories),
  };
}

const ProductsClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [filterOptions, setFilterOptions] = useState<{
    goldTypes: string[];
    brands: string[];
    //types: string[];
    categories: string[];
  }>({
    goldTypes: [],
    brands: [],
    //types: [],
    categories: [],
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getAllProducts();
        console.log(data);
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

  useEffect(() => {
    if (!products.length) return;

    const filtersFromURL: { [key: string]: string[] } = {};
    searchParams.forEach((value, key) => {
      filtersFromURL[key] = value.split(",").map(slugify);
    });

    const filtered = products.filter((product) => {
      return Object.entries(filtersFromURL).every(([key, values]) => {
        switch (key) {
          case "type-dor": {
            const val = slugify(product.gold_type?.name || "");
            return values.includes(val);
          }
          case "marque": {
            const val = slugify(product.brand?.name || "");
            return values.includes(val);
          }
          case "categories": {
            const val = slugify(product.category?.name || "");
            // Always match "Bijoux"
            return values.includes(val) || values.includes("bijoux");
          }
          case "prix": {
            const price = Number(product.fixed_price);
            return values.some((slug) => {
              const range = PRICE_RANGES.find((r) => slugify(r.label) === slug);
              return range ? price >= range.min && price <= range.max : true;
            });
          }
          default:
            return true;
        }
      });
    });

    setFilteredProducts(filtered);
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
            className="group flex items-center gap-2 md:gap-4 rounded-md border border-foreground text-xs md:text-base py-2 px-2 md:px-4"
          >
            <BiFilterAlt size={20} />
            FILTRES
            {isFilterOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowSort((prev) => !prev)}
              className="flex items-center gap-2 border-none text-xs md:text-base"
            >
              <IoFilterSharp />
              Pertinence
            </button>

            {showSort && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                {SORT_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 uppercase"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${slugify(product.category?.name)}/${slugify(
                  product.name
                )}-${product.id}`}
              >
                <Card product={product} />
              </Link>
            ))}
          </div>
        </Reveal>

        <Pagination />
      </div>

      <ScrollBar texts={textScroll} speed={scrollSpeed} />
    </div>
  );
};

export default ProductsClient;
