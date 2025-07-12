'use client';

import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";

const ScrollBackButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300); // Show after some scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 w-full flex justify-end relative">
      <button
        onClick={handleScrollToTop}
        className={` absolute top-2 bg-primary text-white text-lg rounded-full p-3 shadow-lg hover:bg-primary-light transition-all duration-300 transform ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <MdArrowUpward />
      </button>
    </div>
  );
};

export default ScrollBackButton;
