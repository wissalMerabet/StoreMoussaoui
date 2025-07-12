"use client";

import type { Product } from "@/types";
import ProductScrollBar from "../layout/ProductScrollBar";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/app/(home)/products/actions";
import Link from "next/link";

const Newproduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data :Product[] = await getAllProducts();
        //console.log("Products fetched:", data);
        const topProducts = data
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 8);

        setProducts(topProducts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="my-10">
      <h1 className="sub-heading container mx-auto px-6">Nouveaux produits</h1>

      {loading ? (
        <p className="text-center text-sm py-10 text-gray-500">Chargement...</p>
      ) : (
        <ProductScrollBar products={products} />
      )}

      <div className="flex justify-center items-center mt-6">
        <Link
            href="/products"
            className="rounded-lg border border-primary px-6 py-2 md:px-8 md:py-2 text-primary text-sm md:text-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
          >
            Tout afficher
          </Link>
      </div>
    </div>
  );
};

export default Newproduct;
