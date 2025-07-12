"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";


const SearchBar = () => {
  const [searchText, setSearchText] = useState("")
  const debounced = useDebounce(searchText, 2000);

  useEffect(() => {
    const query = debounced.trim();
    if (!query) return;  //empty

    const search = async () => {
      //const results = await fetchSearchResults(query);
      console.log("Search results:", query);
    };

    search();

      
  }, [debounced]);

  return (
    <form className="w-full relative space-y-1">
      <div className="relative">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Que recherchez-vous aujourd'hui ?"
          className="w-full
           h-12 
           border 
           border-foreground 
           rounded-lg 
           pl-3 
           pr-10 
           text-sm
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
