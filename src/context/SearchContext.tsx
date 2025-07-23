"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useDebounce } from "@/hooks/useDebounce";

type SearchContextType = {
  search: string;
  debouncedSearch: string;
  setSearch: (value: string) => void;
};

const SearchContext = createContext({} as SearchContextType);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);

  return (
    <SearchContext.Provider value={{ search, setSearch, debouncedSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
