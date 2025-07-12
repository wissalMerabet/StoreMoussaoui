"use client";

import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const Card = ({ product }: ProductCardProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  //console.log(`${API_URL}${product.thumbnail}`);
  //console.log(`${API_URL}`);
  //console.log(`${product.thumbnail}`);



  return (
    <div className="bg-white border p-2 shadow-sm hover:shadow-md transition w-full max-w-sm mx-auto rounded-md flex flex-col">
      {/* Image */}
      <div className="relative w-full h-36 md:h-56 mb-2">
        <Image
          src={`${API_URL}${product.thumbnail}` || "/placeholder.svg"}
          alt={product.name}
         fill
          className="object-cover border border-border md:border-none rounded-md"
          sizes="(max-width: 768px) 100vw, 300px"
          
        />
      </div>

      {/* Desktop Content */}
      <div className="hidden md:flex flex-col flex-grow justify-between pb-4">
        <div className="border-t-2 border-background my-4 mx-4" />
        <p className="px-4 text-primary text-base font-medium">
          {product.fixed_price}
        </p>
        <div className="px-4 flex flex-row justify-between items-center  ">
          <h3 className=" text-lg h-[2.5rem] truncate mt-1">{product.name}</h3>
          <Image
            src="/images/shopping-bag.svg"
            alt="Check"
            width={24}
            height={24}
            className="text-primary  -mt-1"
          />
        </div>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden flex flex-col flex-grow justify-between">
        <h3 className="text-sm font-medium h-[1.5rem] md:h-[2.5rem] truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center pb-1">
          <p className="text-primary text-sm font-medium">
            {product.fixed_price}
          </p>
          <Image
            src="/images/shopping-bag.svg"
            alt="Check"
            width={24}
            height={24}
            className="text-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
