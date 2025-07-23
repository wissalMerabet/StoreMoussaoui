"use client";

import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Product } from "@/types";
import { slugify } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import MagicZoom from "./MagicZoom";
import { useRouter } from "next/navigation";


interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  const categoryTitle = product.category?.name || "Inconnue";
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { addToCart } = useCart();
  const router = useRouter();

  


  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      fixed_price: product.fixed_price || 0,
      thumbnail: product.thumbnail || "",
      quantity: 1,
    });
  };
 const handleReserve = () => {
  const query = new URLSearchParams({
    direct: "true",
    id: product.id.toString(),
  });

  router.push(`/order?${query.toString()}`);
};



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
            <Link href={`/products/${slugify(categoryTitle)}`} className="px-1">
              {categoryTitle}
            </Link>{" "}
            / <span className="px-1">{product.name}</span>
          </div>
          <Link href={`/products/${slugify(categoryTitle)}`} className="flex items-center gap-1">
            <BsChevronLeft className="mt-0.5 md:mt-1" />
            Retour
          </Link>
        </div>
      </nav>

      {/* Main content */}
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
             
              <button
                onClick={handleAddToCart}
                className="group w-full sm:w-1/2 text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base px-6 py-3 rounded-md font-semibold shadow-sm flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02]"
              >
                Ajouter au panier
                <MdOutlineAddBox className="text-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
              </button>

              {/* Reserve Button */}
              <button
                onClick={handleReserve}
                className="group w-full sm:w-1/2 bg-primary text-white text-sm sm:text-base px-6 py-3 rounded-md font-semibold shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                R&eacute;servez
                <FiShoppingBag className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </button>
            </div>

            {/* Important Info */}
            <div className="mt-4">
              <h2 className="font-semibold text-base sm:text-lg inline-block border-b-2 border-primary mb-3 pb-1">
                Informations Importantes
              </h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>La r&eacute;servation reste valable 48 heures.</li>
                <li>Pr&eacute;visualisation du produit en magasin avant achat.</li>
                <li>Bijoux scell&eacute;s et garantis.</li>
                <li>Emballage de luxe offert gratuitement.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
