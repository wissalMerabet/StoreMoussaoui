"use client";

import { useRef, useEffect } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Card from "./Card";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import type { Product } from "@/types";



interface ProductScrollBarProps {
  products: Product[];
}

const ProductScrollBar = ({ products }: ProductScrollBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  
  

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const middle = container.scrollWidth / 3;
      container.scrollLeft = middle;
    }
  }, []);

  const handleLoop = () => {
    const container = scrollRef.current;
    if (!container) return;

    const third = container.scrollWidth / 3;

    if (container.scrollLeft <= 0) {
      container.scrollLeft = third;
    } else if (container.scrollLeft >= third * 2) {
      container.scrollLeft = third;
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.querySelector(".product-card") as HTMLElement;

    const scrollAmount = card?.clientWidth || 300;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full relative py-10 px-4">
      
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 px-2"
      >
        <BsChevronLeft className="text-3xl text-primary" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 px-2"
      >
        <BsChevronRight className="text-3xl text-primary" />
      </button>

      {/* products */}
      <div
        ref={scrollRef}
        onScroll={handleLoop}
        className="flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory "
      >
        {products.map((product) => {
          
          return (
            <div
              key={product.id}
              className="product-card snap-start w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] flex-shrink-0"
            >
              <Link
                href={`/products/${slugify(product.category?.name)}/${product.id}`}
              >
                <Card product={product} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductScrollBar;
