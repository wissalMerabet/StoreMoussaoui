"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProductById } from "@/app/(home)/products/actions";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Step1ConfirmProduct = () => {
  const { items, totalPrice, addToCart } = useCart();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const isDirect = searchParams.get("direct") === "true";
  const [loading, setLoading] = useState(false);
  const hasAddedRef = useRef(false);

  useEffect(() => {
    const alreadyInCart = items.some(
      (item) => item.id.toString() === productId
    );

    console.log("url", {
      alreadyInCart,
      isDirect,
      productId,
      hasAdded: hasAddedRef.current,
    });

    if (isDirect && productId && !alreadyInCart && !hasAddedRef.current) {
      hasAddedRef.current = true;
      setLoading(true);
      getProductById(productId)
        .then((product) => {
          if (product) {
            addToCart({
              id: product.id,
              name: product.name,
              fixed_price: product.fixed_price || 0,
              thumbnail: product.thumbnail || "",
              quantity: 1,
            });
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du produit:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [isDirect, productId, items , addToCart]);

  if (loading) {
    return (
      <div className="border shadow-xs flex justify-center items-center py-8 w-full bg-white rounded-lg">
        <p className="text-gray-400 text-sm md:text-lg ">
          Chargement²²²...
        </p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className=" border shadow-xs flex flex-col gap-4 pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-10 w-full bg-white rounded-md">
        <p className="text-center text-foreground text-sm md:text-lg opacity-80">
          Votre Panier Est Vide.
        </p>
      </div>
    );
  }

  return (
    <div className="md:max-w-6xl p-6 shadow-sm bg-white">
      <h2 className="font-semibold text-xl md:text-3xl text-primary inline-block border-b-2 border-primary mb-4 pb-1">
        Confirmer les produits
      </h2>

      <div className="flex flex-col gap-6 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 "
          >
            <div className="relative w-full md:w-[150px] aspect-[4/3] md:aspect-auto md:h-[140px] max-w-full shadow-sm overflow-hidden">
              <Image
                src={
                  item.thumbnail
                    ? `${API_URL}${item.thumbnail}`
                    : "/placeholder.svg"
                }
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 gap-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="space-y-2">
                  <h1 className="text-base md:text-2xl font-medium">
                    {item.name}
                  </h1>
                  <p className="text-xs md:text-sm font-medium">
                    Quantit&eacute;: <span className="ml-2">{item.quantity}</span>
                  </p>
                </div>

                <p className="text-primary font-bold text-lg md:text-2xl">
                  {item.fixed_price.toLocaleString()} DA
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price  */}
      <div className="mt-10 text-right">
        <p className="text-base ">
          Total{" "}
          <span className="text-primary font-bold text-3xl ml-2">
            {totalPrice.toLocaleString()} DA
          </span>
        </p>
      </div>
    </div>
  );
};

export default Step1ConfirmProduct;
