"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "../../actions";
import MagicZoom from "@/components/layout/MagicZoom";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { BsChevronLeft } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      fixed_price: product.fixed_price || 0,
      thumbnail: product.thumbnail || "",
      quantity: 1,
    });
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!params?.id) return;
      try {
        const data = await getProductById(params.id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params]);

  if (loading) return <div>Chargement...</div>;
  if (!product) return <div>Produit introuvable.</div>;

  

  return (
    <div className="bg-white text-[#383434] pt-18 sm:pt-22 md:pt-34 lg:pt-36 lg:pb-0">
      {/* Navigation */}
      <nav className="bg-[#0A142F] text-white">
        <div className="container mx-auto text-[10px] md:text-sm mb-8 py-3 px-4 flex justify-between items-center gap-2">
          <div>
            <Link href="/" className="px-1">
              Accueil
            </Link>{" "}
            /{" "}
            <Link href={`/products/${slugify(product.category?.name)}`} className="px-1">
              {product.category?.name}
            </Link>{" "}
            / <span className="px-1">{product.name}</span>
          </div>
          <Link href="/" className="flex items-center gap-1">
            <BsChevronLeft className="mt-0.5 md:mt-1" />
            Retour
          </Link>
        </div>
      </nav>
      <div className="container mx-auto md:px-8 lg:px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 items-start">
          {/* Product Image */}
          <div className="relative border w-full h-72 md:h-[420px] lg:h-[500px] max-w-[800px] mx-auto mb-4 shadow-xs hover:shadow-sm transition rounded-md overflow-hidden bg-white">
            <MagicZoom
              src={
                product.thumbnail
                  ? `${API_URL}${product.thumbnail}`
                  : "/placeholder.svg"
              }
              alt={product.name}
              scale={2}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="pt-8 px-4 max-w-full md:max-w-[600px]">
            <div className="flex justify-between items-center md:flex-col md:items-start mb-4">
              <h1 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold">
                {product.name}
              </h1>
              <p className="text-primary text-[16px] sm:text-[26px] lg:text-[32px] font-bold">
                {product.fixed_price?.toLocaleString()} DA
              </p>
            </div>

            {/* Description */}
            <div className="mb-4 space-y-2 text-sm leading-relaxed">
              <div className="flex items-center text-xs md:text-2xl font-semibold gap-2">
                <HiOutlineExclamationCircle />
                Description
              </div>
              <p className="text-xs md:text-sm">{product.description}</p>
            </div>

            {/* Reserve */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="group w-full sm:w-1/2 text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base px-6 py-3 rounded-md font-semibold shadow-sm flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02]"
              >
                Ajouter au panier
                <MdOutlineAddBox className="text-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
              </button>

              {/* Reserve Button */}
              <Link
                href="/order"
                className="group w-full sm:w-1/2 bg-primary text-white text-sm sm:text-base px-6 py-3 rounded-md font-semibold shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Réservez
                <FiShoppingBag className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </Link>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold border-b-2 border-primary inline-block mb-2">
                Informations Importantes
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>La réservation reste valable 48 heures.</li>
                <li>Prévisualisation du produit en magasin avant achat.</li>
                <li>Bijoux scellés et garantis.</li>
                <li>Emballage de luxe offert gratuitement.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
