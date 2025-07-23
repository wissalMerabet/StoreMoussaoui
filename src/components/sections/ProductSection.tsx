"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../layout/Card";
import Reveal from "../layout/Reveal";
import { slugify } from "@/lib/utils";
import type { Product } from "@/types";
import { getAllProducts } from "@/app/(home)/products/actions";
import { useSearch } from "@/context/SearchContext";

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { debouncedSearch } = useSearch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getAllProducts();
        console.log(data)
        const topProducts = data.slice(0, 8);
        setProducts(topProducts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
  p.name.toLowerCase().includes((debouncedSearch || "").toLowerCase())
);


  return (
    <section className="bg-white">
      <div className="relative container mx-auto max-w-7xl py-4 px-4">
        <div className="flex flex-col space-y-6">
          <h1 className="sub-heading container mx-auto px-4">Meilleur Produit</h1>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
              {loading ? (
                <div className="col-span-full text-center text-gray-500 py-8">
                  Chargement...
                </div>
              ) : filtered.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-8">
                  Aucun produit trouvé.
                </div>
              ) : (
                filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${slugify(product.category?.name)}/${product.id}`}
                  >
                    <Card product={product} />
                  </Link>
                ))
              )}
            </div>
          </Reveal>

          <div className="flex justify-center items-center">
            <Link
              href="/products"
              className="rounded-lg border border-primary px-6 py-2 md:px-8 md:py-2 text-primary text-[10px] md:text-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
            >
              Tout afficher
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
