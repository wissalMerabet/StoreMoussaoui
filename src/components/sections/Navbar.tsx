"use client";
import { useState } from "react";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiHeart, FiSearch, FiMapPin, FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import SearchBar from "../layout/SearchBar";
import Logo from "../layout/Logo";
import NavItemsBar from "../layout/NavItemsBar";



const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { items } = useCart();
  const uniqueIds = new Set(items.map((item) => item.id));
  const count = uniqueIds.size;

  return (
    <header className="fixed top-0 left-0 inset-x-0 z-20 bg-white flex flex-col gap-4  ">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center px-4 py-5 container mx-auto">
        <div className="flex-1 min-w-0 max-w-full sm:max-w-[240px] md:max-w-[350px] lg:max-w-[360px] mr-2">
          <SearchBar />
        </div>

        <div className="flex-shrink-0 px-4 md:px-16 md:mx-2">
          <Logo />
        </div>

        <div className="flex-1 max-w-full lg:max-w-[360px] flex justify-end gap-4 items-center">
          <HiOutlineLocationMarker className="text-2xl cursor-pointer hover:text-black" />
          <FiHeart className="text-2xl cursor-pointer hover:text-black" />
          <Link href="/panier" className="relative">
            <FiShoppingBag className="text-2xl hover:text-black" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary border border-white text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-3 sm:px-6 py-3">
        {/* Left Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            className=" hover:text-black"
            onClick={() => setIsNavOpen(true)}
            aria-label="Open menu"
          >
            <GiHamburgerMenu size={22} />
          </button>
          <button aria-label="Search" className=" hover:text-black">
            <FiSearch size={22} />
          </button>
        </div>

        <Logo />

        {/* Right Icons */}
        <div className="flex items-center gap-1  sm:gap-2">
          <FiMapPin size={22} className="  hover:text-black" />
          <Link href="/panier" className="relative" aria-label="Panier">
            <FiShoppingBag
              size={22}
              className="  hover:text-black transition-colors"
            />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary border border-white text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Navbar Items*/}
      <NavItemsBar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </header>
  );
};

export default Navbar;
