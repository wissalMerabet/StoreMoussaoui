"use client";

import { FiSearch } from "react-icons/fi";
import { useSearch } from "@/context/SearchContext";

const SearchBar = () => {
  const { search, setSearch } = useSearch();

  return (
    <form className="w-full relative space-y-1" onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Que recherchez-vous aujourd'hui ?"
          className="w-full
            h-12 
            border 
            border-foreground/50
            rounded-lg 
            pl-3 
            pr-10 
            text-sx lg:text-sm
            transition 
            duration-200"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <FiSearch className="text-xl text-foreground" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
