"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/layout/CartItem"; 

import { BsChevronLeft } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";


const Page = () => {
  const { items, totalPrice } = useCart();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  return (
    <div className="mx-auto pt-18 sm:pt-22 md:pt-34 lg:pt-36 lg:pb-0 bg-white">
      {/* Navigation */}
      <nav className="bg-[#0A142F] text-sm text-white">
        <div className="container mx-auto px-4 text-[10px] md:text-sm mb-8 py-3 flex justify-between items-center gap-2">
          <div>Panier</div>
          <Link href="/" className="flex flex-row gap-1">
            <BsChevronLeft className="mt-0.5 md:mt-1" />
            Retour
          </Link>
        </div>
      </nav>

      <div className="container mx-auto md:px-8 lg:px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 items-start mt-20">
          {/* Cart Items */}
          <div>
            <h1 className="font-bold text-lg md:text-2xl mb-6 leading-[30px] px-4">
              Récapitulatif Commande
            </h1>
            <div className="border w-full max-w-[800px] mx-auto mb-4 shadow-xs flex flex-col gap-4 pt-12 pb-6 px-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">Votre panier est vide.</p>
              ) : (
                items.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))
              )}
            </div>
          </div>

          {/* Summary & Info */}
          <div className="pt-8 px-4 max-w-full md:max-w-[600px]">
            <div className="mt-4">
              <h2 className="font-semibold text-base sm:text-lg inline-block border-b-2 border-primary mb-3 pb-1">
                Informations Importantes
              </h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>La réservation reste valable 48 heures.</li>
                <li>Prévisualisation du produit en magasin avant achat.</li>
                <li>Bijoux scellés et garantis.</li>
                <li>Emballage de luxe offert gratuitement.</li>
              </ul>
            </div>

            <div className="flex flex-row items-center justify-between mt-6 mb-3 pb-1">
              <h1 className="font-extrabold text-xl md:text-2xl border-b-2 border-primary">
                Total
              </h1>
              <p className="text-primary font-extrabold text-xl md:text-2xl">
                {(totalPrice || 0).toLocaleString()} DA
              </p>
            </div>

            <Link
              href="/order"
              className=" group bg-primary w-full text-white text-xs md:text-xl px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 mt-6 hover:bg-primary/90 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Réservez
              <FiShoppingBag className="transition-transform duration-300 group-hover:translate-x-1"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
