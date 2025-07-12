"use client";
import { images } from "@/constants/data";
import Image from "next/image";
import { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { IoIosArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image Slider */}
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          fill
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          priority={index === currentIndex}
        />
      ))}

      {/* Left Arrow */}
      <div className="absolute inset-y-0 left-4 flex items-center z-10">
        <button
          onClick={prevSlide}
          className="text-white text-3xl p-2  transition"
        >
          <BsChevronLeft className="text-5xl" />
        </button>
      </div>

      {/* Right Arrow */}
      <div className="absolute inset-y-0 right-4 flex items-center z-10">
        <button
          onClick={nextSlide}
          className="text-white text-3xl p-2  transition"
        >
          <BsChevronRight className="text-5xl" />
        </button>
      </div>

      <motion.div
        className="absolute bottom-16 right-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <button className="group flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 transition duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Découvrir
          <IoIosArrowDropright
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </motion.div>
    </div>
  );
}
