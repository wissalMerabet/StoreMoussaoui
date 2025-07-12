"use client";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedImg, setSelectedImg] = useState(images[0]); //1 img 

  return (
    <div>
      <div className="relative border w-full h-72 md:h-[420px] lg:h-[540px] max-w-[800px] mx-auto mb-4 shadow-xs hover:shadow-sm transition">
        <Image
          src={selectedImg}
          alt={name}
          fill
          className="object-cover border border-border md:border-none"
        />
      </div>

      <div className="flex gap-3 mt-4 justify-start px-6 md:justify-center flex-wrap">
        {images.map((img, i) => (
          <div
            key={i}
            className={clsx("border p-1 w-[60px] h-[60px] md:w-[100px] md:h-[100px] cursor-pointer shadow-sm hover:shadow-md transition",selectedImg === img ? "border-primary" : "border-foreground")}
            onClick={() => setSelectedImg(img)}
          >
            <Image
              src={img}
              alt={`Miniature ${i + 1}`}
              width={100}
              height={100}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
