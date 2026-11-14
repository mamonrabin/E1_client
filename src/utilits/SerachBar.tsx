/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/src/config/config";
import Image from "next/image";

const MIN_CHARS = 2;

const SearchBar = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmed = query.trim();
  const canSearch = trimmed.length >= MIN_CHARS;

  // Ctrl/Cmd + K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset when the panel closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      setLoading(false);
    }
  }, [open]);

  // Debounced fetch; older requests are cancelled so results never arrive out of order
  const fetchProducts = useCallback(async (term: string, signal: AbortSignal) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiBaseUrl}/product/pagination?searchTerm=${encodeURIComponent(term)}&limit=5`,
        { cache: "no-store", signal }
      );
      const data = await res.json();
      setResults(data?.data?.data || []);
      setActiveIndex(-1);
      setLoading(false);
    } catch (error: any) {
      if (error?.name === "AbortError") return;
      console.error("Search error:", error);
      setResults([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!canSearch) {
      setResults([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => fetchProducts(trimmed, controller.signal), 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed, canSearch, fetchProducts]);

  const goToProduct = (slug: string) => {
    setOpen(false);
    router.push(`/product/${slug}`);
  };

  const goToShop = () => {
    if (!trimmed) return;
    setOpen(false);
    router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      goToProduct(results[activeIndex].slug);
    } else {
      goToShop();
    }
  };

  // Arrow keys move through suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  };

  const showSkeleton = loading && results.length === 0;
  const showEmpty = canSearch && !loading && results.length === 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Search products"
        className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Search size={18} />
        <span className="hidden lg:block">Search</span>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="max-h-[90vh] overflow-y-auto px-5 pb-8 pt-8 md:px-12 lg:px-60 [&>button]:hidden"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <SheetHeader className="p-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SheetTitle className="text-xl font-semibold tracking-tight md:text-2xl">
                What are you looking for?
              </SheetTitle>
              <SheetDescription className="mt-1 text-sm text-gray-500">
                Search by product name. Use the arrow keys to browse results.
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close search"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#262626]/15 text-[#262626]/70 transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            role="search"
            className="mt-5 flex items-center gap-3 rounded-full border border-[#262626]/15 bg-gray-50 px-5 py-3 transition focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
          >
            <Search size={20} className="shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search bags, backpacks, wallets..."
              aria-label="Search products"
              autoComplete="off"
              className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
            />
            {loading && <Loader2 size={18} className="shrink-0 animate-spin text-gray-400" />}
            {query && !loading && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="shrink-0 text-gray-400 transition-colors hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              disabled={!canSearch}
              className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Search
            </button>
          </form>

          {/* Hint */}
          {query && !canSearch && (
            <p className="mt-3 px-2 text-sm text-gray-500">
              Type at least {MIN_CHARS} letters to see results.
            </p>
          )}

          {/* Loading skeleton */}
          {showSkeleton && (
            <ul className="mt-4 space-y-2" aria-hidden>
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex animate-pulse items-center gap-4 rounded-xl p-3">
                  <div className="h-16 w-16 rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-gray-200" />
                    <div className="h-3 w-1/4 rounded bg-gray-200" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-4" role="listbox" aria-label="Search suggestions">
              <ul className="space-y-1">
                {results.map((item, i) => (
                  <li key={item._id} role="option" aria-selected={activeIndex === i}>
                    <button
                      type="button"
                      onClick={() => goToProduct(item.slug)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`group flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors duration-200 ${
                        activeIndex === i ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {item.thumbal_image && (
                          <Image
                            src={apiBaseUrl + item.thumbal_image}
                            alt={item.title}
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium md:text-base">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-primary">
                          ${item.price}
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="shrink-0 -translate-x-1 text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={goToShop}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#262626]/15 py-3 text-sm font-medium transition-colors duration-300 hover:bg-primary hover:text-white"
              >
                View all results for &ldquo;{trimmed}&rdquo;
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="mt-6 rounded-xl bg-gray-50 px-6 py-10 text-center">
              <p className="font-medium">No products found for &ldquo;{trimmed}&rdquo;</p>
              <p className="mt-1 text-sm text-gray-500">
                Check the spelling or try a shorter, more general word.
              </p>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;