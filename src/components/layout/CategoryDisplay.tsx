"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoFilterSharp } from "react-icons/io5";
import { BsChevronLeft } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { slugify } from "@/lib/utils";
import Card from "@/components/layout/Card";
import ProductScrollBar from "@/components/layout/ProductScrollBar";
import ScrollBar from "@/components/layout/ScrollBar";
import ScrollBackButton from "@/components/layout/ScrollBackButton";
import Reveal from "@/components/layout/Reveal";

import { scrollSpeed, SORT_OPTIONS, textScroll } from "@/constants/data";
import { Product } from "@/types";
import { useEffect, useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import { getAllProducts } from "@/app/(home)/products/actions";

interface Props {
  products: Product[];
}



const CategoryDisplay = ({ products }: Props) => {
  const categoryTitle = products[0]?.category?.name || "Inconnue";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getAllProducts();
        console.log("Products fetched:", data);
        const topProducts = data
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 10);

        setLatestProducts(topProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

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
};

export default CategoryDisplay;
