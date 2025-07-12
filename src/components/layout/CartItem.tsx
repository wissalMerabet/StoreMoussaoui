"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  id: number;
  name: string;
  fixed_price: number;
  thumbnail: string;
  quantity: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CartItem = ({
  id,
  name,
  fixed_price,
  thumbnail,
  quantity,
}: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="relative flex gap-4   min-h-[140px] ">
      {/* Image */}
      <div className="w-38 relative shadow-sm flex-shrink-0">
        <Image
          src={thumbnail ? `${API_URL}${thumbnail}` : "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover rounded-md h-full"
        />
      </div>

      {/* Info block */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-sm md:text-lg font-semibold -mt-1">{name}</h2>
          <p className="text-primary font-semibold mt-1 text-xs md:text-base">
            {fixed_price?.toLocaleString?.() ?? "0"} DA
          </p>
          <p className="text-xs md:text-sm mt-1">
            Bague En Or Pur 18 Carats
          </p>
        </div>
      </div>

      
      <div className="absolute bottom-0 right-0 flex items-center gap-2">
        <button
          onClick={() => removeFromCart(id)}
          className=""
        >
          <RiDeleteBin5Line size={18} />
        </button>

        {/* Quantity */}
        <div className="flex border rounded-md overflow-hidden h-8">
          
          <button
            onClick={() => updateQuantity(id, Math.max(quantity - 1, 1))}
            className="w-8 flex items-center justify-center text-sm font-semibold "
          >
            −
          </button>
          <div className="w-8 flex items-center justify-center text-sm border-l border-r">
            {quantity}
          </div>
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="w-8 flex items-center justify-center text-sm font-semibold "
          >
            +
          </button>
        </div>

        
        
      </div>
    </div>
  );
};

export default CartItem;
