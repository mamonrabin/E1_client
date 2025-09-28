/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/src/config/config";
import Image from "next/image";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch suggestions while typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        fetchProducts(query);
      } else {
        setResults([]);
      }
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchProducts = async (term: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiBaseUrl}/product/pagination?searchTerm=${encodeURIComponent(
          term
        )}&limit=5`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setResults(data?.data?.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Redirect to shop page with search term
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      // ✅ Close sheet after search
      const closeBtn = document.querySelector<HTMLButtonElement>(
        "[data-sheet-close]"
      );
      closeBtn?.click();
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="mt-1 cursor-pointer">
        <p className="flex items-center gap-2 cursor-pointer uppercase lg:text-[13px] text-xl">
          <Search size={18} />
          <span className="lg:block hidden">Search</span>
        </p>
      </SheetTrigger>

      <SheetContent side="top" className="lg:px-60 py-8">
        <SheetHeader>
          <h1 className="text-xl uppercase font-medium">
            What are you looking for?
          </h1>

          {/* 🔹 Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full mt-4 border-b border-[#262626]/40"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full outline-none text-lg py-2"
            />
            <button type="submit">
              <Search size={20} />
            </button>
          </form>

          {/* 🔹 Suggestions */}
          {query && results.length > 0 && (
            <div className="mt-4 bg-white border border-gray-200 rounded shadow-md max-h-64 overflow-y-auto">
              {results.map((item) => (
                <SheetClose asChild key={item._id}>
                  <div
                    onClick={() => router.push(`/product/${item.slug}`)}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <Image
                      src={apiBaseUrl + item.thumbal_image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-medium text-sm line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">${item.price}</p>
                    </div>
                  </div>
                </SheetClose>
              ))}
            </div>
          )}

          {/* 🔹 No results */}
          {query && !loading && results.length === 0 && (
            <p className="mt-4 text-sm text-gray-500">No products found.</p>
          )}
        </SheetHeader>

        {/* Close button */}
        <SheetClose className="top-5 right-8 absolute" data-sheet-close>
          <p className="w-6 h-6 flex items-center justify-center bg-white hover:bg-primary hover:text-white text-[#262626]/60 border border-[#262626]/20 rounded duration-300 cursor-pointer">
            <X size={20} />
          </p>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
