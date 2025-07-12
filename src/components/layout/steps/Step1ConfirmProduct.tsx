"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Step1ConfirmProduct = () => {
  const { items, totalPrice } = useCart();

  if (!items.length) {
    return <div>Votre panier est vide.</div>;
  }

  return (
    <div className="md:max-w-6xl p-6 shadow-sm bg-white">
      <h2 className="font-semibold text-xl md:text-3xl text-primary inline-block border-b-2 border-primary mb-9 pb-1">
        Confirmer les produits
      </h2>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8  "
          >
            <div className="relative w-full md:w-[150px] aspect-[4/3] md:aspect-auto md:h-[140px] max-w-full shadow-sm rounded-lg overflow-hidden">
              <Image
                src={item.thumbnail ? `${API_URL}${item.thumbnail}` : "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 gap-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="space-y-2">
                  <h1 className="text-base md:text-xl font-medium">
                    {item.name}
                  </h1>
                  <p className="text-sm font-medium">
                    Quantité: <span className="ml-2">{item.quantity}</span>
                  </p>
                </div>

                <p className="text-primary font-bold text-lg md:text-xl">
                  {item.fixed_price.toLocaleString()} DZ
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price  */}
      <div className="mt-8 text-right">
        <p className="text-sm ">
          Total{" "}
          <span className="text-primary font-bold text-2xl ml-2">
            {totalPrice.toLocaleString()} DZ
          </span>
        </p>
      </div>
    </div>
  );
};

export default Step1ConfirmProduct;
