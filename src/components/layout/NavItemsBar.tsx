"use client";

import Link from "next/link";
import { GoChevronDown } from "react-icons/go";
import { FiX, FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuData, navbarData } from "@/constants/data";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { slugify } from "@/lib/utils";
import Image from "next/image";

interface NavItemsBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavItemsBar = ({ isOpen, onClose }: NavItemsBarProps) => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeNav = useMemo(() => {
    const normalizedPath = pathname.toLowerCase();

    const matched = navbarData.desktopNavBarList.find((item) => {
      const itemPath = item.link.toLowerCase();
      return (
        normalizedPath === itemPath || normalizedPath.startsWith(itemPath + "/")
      );
    });

    return matched?.title.toLowerCase() ?? "";
  }, [pathname]);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:block w-full relative z-20 bg-white shadow">
        <div
          className="container mx-auto px-4 relative"
          onMouseLeave={() => setActiveMenu(null)}
          onMouseEnter={() => null}
        >
          <ul className="flex space-x-6 justify-center items-center py-1 ">
            {navbarData.desktopNavBarList.map((item, index) => {
              const hasMegaMenu = megaMenuData.some(
                (menu) => menu.label.toLowerCase() === item.title.toLowerCase()
              );

              return (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={() => hasMegaMenu && setActiveMenu(item.title)}
                >
                  <div
                    className={clsx(
                      "flex items-center gap-1 text-[12px] font-semibold uppercase cursor-pointer",
                      activeNav === item.title.toLowerCase()
                        ? "text-primary "
                        : "hover:border-b-2 hover:border-primary pb-1"
                    )}
                  >
                    <Link href={item.link}>{item.title}</Link>
                    {hasMegaMenu && (
                      <GoChevronDown size={15} className="mt-[1px]" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Mega Menu */}
          <AnimatePresence>
            {activeMenu &&
              (() => {
                const matchedMenu = megaMenuData.find(
                  (menu) =>
                    menu.label.toLowerCase() === activeMenu?.toLowerCase()
                );

                return (
                  <motion.div
                    key={activeMenu}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="absolute left-0 top-full w-full z-30"
                  >
                    <div className="max-w-7xl mx-auto px-2 bg-white flex  md:flex-row items-start lg:gap-2 md:gap-1 py-3 lg:py-0">
                      {/* Image */}
                      {matchedMenu?.image && (
                        <Image
                          src={matchedMenu.image}
                          alt={activeMenu || ""}
                          width={246}
                          height={350}
                          className="object-cover md:w-[170px] lg:w-[246px] md:h-[310px] lg:h-[350px]"
                        />
                      )}

                      {/* categories */}
                      <div className="flex flex-1 flex-wrap items-start md:gap-x-1 lg:gap-x-2 md:grid-cols-5 lg:space-y-15">
                        {matchedMenu?.subcategories.map((subcategory, idx) => (
                          <div
                            key={idx}
                            className="lg:min-w-[246px] md:min-w-[140px]"
                          >
                            <h4 className="text-xs lg:text-sm font-semibold mb-1 lg:mb-3 uppercase">
                              Par {subcategory.title}
                            </h4>
                            <div className="border-t border-black mb-2" />
                            <ul className="space-y-2">
                              {subcategory.items.map((item, i) => (
                                <li key={i}>
                                  <Link
                                    href={`/products/${slugify(
                                      activeMenu.toLowerCase()
                                    )}?search=${slugify(item.toLowerCase())}`}
                                    className="text-[10px] lg:text-xs font-medium opacity-80 hover:text-primary transition"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-18 left-0 right-0 bg-white shadow-md p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 text-xs font-medium">
                <span>FR</span> | <span>AR</span>
              </div>
              <button onClick={onClose} aria-label="Close menu">
                <FiX size={24} />
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {navbarData.mobileNavBarList.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={clsx(
                      "block uppercase text-sm",
                      item.title === "HOMEPAGE"
                        ? "text-primary"
                        : "hover:text-primary",
                      activeNav === item.title.toLowerCase()
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t-2 my-6 -mx-6" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <FiPhone size={20} />
                Appelez-nous
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker size={20} />
                Nos Boutiques
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavItemsBar;
