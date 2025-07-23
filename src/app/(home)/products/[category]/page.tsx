"use client";

import { getAllProducts } from "../actions";
import { notFound, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";

import {
  extractUniqueFilterValues,
  slugify,
  sortProducts,
} from "@/lib/utils";
import type { Product } from "@/types";
import { PRICE_RANGES, scrollSpeed, textScroll } from "@/constants/data";

import Card from "@/components/layout/Card";
import ProductScrollBar from "@/components/layout/ProductScrollBar";
import ScrollBar from "@/components/layout/ScrollBar";
import ScrollBackButton from "@/components/layout/ScrollBackButton";
import Reveal from "@/components/layout/Reveal";
import FilterSidebar from "@/components/layout/FilterSidebar";
import SortDropdown from "@/components/layout/SortDropdown";

export default function Page() {

  const params = useParams();
  const category = (params?.category as string) ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    goldTypes: [] as string[],
    brands: [] as string[],
    categories: [] as string[],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();

  // products 
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();

        const filtered = allProducts.filter((product: Product) => {
          const catName = product.category?.name || "";
          return slugify(catName) === category;
        });

        if (filtered.length === 0) return notFound();

        setProducts(filtered);
        setFilterOptions(extractUniqueFilterValues(allProducts));

        const topProducts = allProducts
          .sort(
            (a: Product, b: Product) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 10);

        setLatestProducts(topProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        notFound();
      }
    }

    fetchData();
  }, [category]);

  // products filters 
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
              const range = PRICE_RANGES.find(
                (r) => slugify(r.label) === slug
              );
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

  const categoryTitle = products.length > 0 ? products[0]?.category?.name ?? category : category;

  return (
    <div className="mx-auto pt-18 sm:pt-22 md:pt-34 lg:pt-36 lg:pb-0">
      {/* Breadcrumb Nav */}
      <nav className="bg-[#0A142F] text-sm text-white">
        <div className="container mx-auto px-4 text-[10px] md:text-sm mb-8 py-3 flex justify-between items-center gap-2">
          <div>
            <Link href="/" className="px-1">
              Accueil
            </Link>{" "}
            / <span className="px-1">{categoryTitle}</span>
          </div>
          <Link href="/" className="flex flex-row gap-1">
            <BsChevronLeft className="mt-0.5 md:mt-1" />
            Retour
          </Link>
        </div>
      </nav>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold">{categoryTitle}</h1>
        <p className="text-xs md:text-[16px] mt-2 px-4">
          Moussaoui Mounir a sélectionné pour vous les plus belles pièces pour
          être à la hauteur de votre amour ! Le bijou de vos rêves vous attend
          déjà.
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="bg-white text-black mt-12 py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="group flex items-center gap-2 md:gap-4 rounded-md border border-foreground text-xs md:text-base py-2 px-2 md:px-4"
          >
            <BiFilterAlt size={20} />
            FILTRES
            {isFilterOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
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
                  href={`/products/${slugify(categoryTitle)}/${product.id}`}
                >
                  <Card product={product} />
                </Link>
              ))
            )}
          </div>
        </Reveal>

        <ScrollBackButton />
      </div>

      {/* Scrollbars */}
      <h2 className="sub-heading container mx-auto pt-6 px-4">
        Continuez à explorer
      </h2>
      <ProductScrollBar products={latestProducts} />
      <ScrollBar texts={textScroll} speed={scrollSpeed} />
    </div>
  );
}
