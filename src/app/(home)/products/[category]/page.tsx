"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllProducts } from "../actions";
import { slugify } from "@/lib/utils";
import { Product } from "@/types";

import { BsChevronLeft } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

import Card from "@/components/layout/Card";
import ProductScrollBar from "@/components/layout/ProductScrollBar";
import ScrollBar from "@/components/layout/ScrollBar";
import ScrollBackButton from "@/components/layout/ScrollBackButton";
import Reveal from "@/components/layout/Reveal";
import FilterSidebar from "@/components/layout/FilterSidebar";

import { SORT_OPTIONS, scrollSpeed, textScroll } from "@/constants/data";



export default function Page() {
  const params = useParams();
  
  const category = (params?.category as string) ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const allProducts: Product[] = await getAllProducts();

      const filtered = allProducts.filter((product: Product) => {
        const catName = product.category?.name || "";
        return slugify(catName) === category;
      });

      if (filtered.length === 0) {
        notFound(); // Navigate to 404 if no matching products
        return;
      }

      setProducts(filtered);

      const topProducts = allProducts
        .sort((a: Product, b: Product) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 10);

      setLatestProducts(topProducts);
    }

    fetchData();
  }, [category]);

  const categoryTitle = products[0]?.category?.name || "Inconnue";

  return (
    <div className="mx-auto pt-18 sm:pt-22 md:pt-34 lg:pt-36 lg:pb-0">
      {/* Navigation */}
      <nav className="bg-[#0A142F] text-sm text-white">
        <div className="container mx-auto px-4 text-[10px] md:text-sm mb-8 py-3 flex justify-between items-center gap-2">
          <div>
            <Link href="/" className="px-1">
              Accueil
            </Link>{" "}
            /<span className="px-1">{categoryTitle}</span>
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

      {/* Filters */}
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
          />
        )}

        {/* Products */}
        <Reveal>
          <div className="container mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${slugify(categoryTitle)}/${slugify(
                  product.name
                )}-${product.id}`}
              >
                <Card product={product} />
              </Link>
            ))}
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
