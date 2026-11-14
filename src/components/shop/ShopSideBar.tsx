
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import PriceRange from "./PriceRange";
import SizeFiltering from "./SizeFiltering";
import {
  TBrand,
  TCategory,
  TColor,
  TProducts,
  TSize,
} from "@/src/types";

interface ShopProps {
  categories: TCategory[];
  brands: TBrand[];
  colores: TColor[];
  sizes: TSize[];
  products: TProducts[];
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#202020]/10 py-5 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold tracking-wide text-[#202020]">
          {title}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#087096]"
        >
          <ChevronDown size={18} strokeWidth={1.8} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShopSideBar: React.FC<ShopProps> = ({
  categories,
  brands,
  colores,
  sizes,
  products,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showAll, setShowAll] = useState(false);

  const [minPrice, setMinPrice] = useState<number | null>(() => {
    const value = searchParams.get("minPrice");
    return value ? Number(value) : null;
  });

  const [maxPrice, setMaxPrice] = useState<number | null>(() => {
    const value = searchParams.get("maxPrice");
    return value ? Number(value) : null;
  });

  const [priceChanged, setPriceChanged] = useState(false);

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 5);

  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");
  const selectedColor = searchParams.get("colors");
  const selectedSize = searchParams.get("size");

  // Keep price inputs synchronized with URL changes.
  useEffect(() => {
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");

    setMinPrice(min ? Number(min) : null);
    setMaxPrice(max ? Number(max) : null);
    setPriceChanged(false);
  }, [searchParams]);

  // Update both price values in one navigation.
  useEffect(() => {
    if (!priceChanged || minPrice === null || maxPrice === null) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", String(minPrice));
    params.set("maxPrice", String(maxPrice));
    params.set("page", "1");

    router.push(`?${params.toString()}`);
    setPriceChanged(false);
  }, [minPrice, maxPrice, priceChanged, router, searchParams]);

  // Update filters in the URL.
  const updateParams = (type: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    const stringValue = String(value);
    const currentValue = params.get(type);

    if (currentValue === stringValue) {
      params.delete(type);
    } else {
      params.set(type, stringValue);
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleMinPriceChange = (min: number) => {
    setMinPrice(min);
    setPriceChanged(true);
  };

  const handleMaxPriceChange = (max: number) => {
    setMaxPrice(max);
    setPriceChanged(true);
  };

  // Avoid duplicate color swatches.
  const uniqueColors = colores?.filter(
    (color, index, self) =>
      index ===
      self.findIndex((item) => item.colorCode === color.colorCode)
  );

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    [
      "category",
      "brand",
      "colors",
      "size",
      "minPrice",
      "maxPrice",
      "page",
    ].forEach((key) => params.delete(key));

    setMinPrice(null);
    setMaxPrice(null);
    setPriceChanged(false);

    router.push(`?${params.toString()}`);
  };

  const hasActiveFilters = [
    selectedCategory,
    selectedBrand,
    selectedColor,
    selectedSize,
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
  ].some(Boolean);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full rounded-sm border border-[#202020]/10 bg-white p-5 md:p-6"
    >
      {/* Filter heading */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#087096]" />

          <h2 className="text-base font-semibold text-[#202020]">
            Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-medium text-[#087096] transition-colors hover:text-[#202020]"
          >
            <RotateCcw size={13} />
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="flex flex-col gap-3">
          {visibleCategories.map((category) => {
            const active = selectedCategory === category._id;

            return (
              <button
                key={category._id}
                type="button"
                onClick={() => updateParams("category", category._id)}
                className={`flex items-center justify-between text-left text-sm capitalize transition-colors duration-200 ${
                  active
                    ? "font-semibold text-[#087096]"
                    : "text-[#202020]/65 hover:text-[#087096]"
                }`}
              >
                <span>{category.title}</span>

                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#087096]" />
                )}
              </button>
            );
          })}

          {categories.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="mt-1 w-fit text-xs font-semibold text-[#087096] transition-colors hover:text-[#202020]"
            >
              {showAll ? "Show Less −" : "View All +"}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands">
        <div className="flex flex-col gap-3">
          {brands?.map((brand) => {
            const active = selectedBrand === brand._id;

            return (
              <button
                key={brand._id}
                type="button"
                onClick={() => updateParams("brand", brand._id)}
                className={`flex items-center justify-between text-left text-sm capitalize transition-colors duration-200 ${
                  active
                    ? "font-semibold text-[#087096]"
                    : "text-[#202020]/65 hover:text-[#087096]"
                }`}
              >
                <span>{brand.title}</span>

                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#087096]" />
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Sizes">
        <SizeFiltering
          sizes={sizes}
          updateParams={updateParams}
        />
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-3">
          {uniqueColors?.map((color) => {
            const active = selectedColor === color._id;

            return (
              <button
                key={color._id}
                type="button"
                onClick={() => updateParams("colors", color._id)}
                title={color.colorName || color.colorCode}
                aria-label={`Filter by ${color.colorName || "color"}`}
                aria-pressed={active}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 ${
                  active
                    ? "scale-110 border-[#087096] ring-2 ring-[#087096]/25 ring-offset-2"
                    : "border-gray-200 hover:scale-110 hover:border-[#087096]"
                }`}
              >
                <span
                  className="h-6 w-6 rounded-full border border-black/10"
                  style={{ backgroundColor: color.colorCode }}
                />
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <PriceRange
          minPrice={minPrice ?? 0}
          maxPrice={maxPrice ?? 0}
          onMinChange={handleMinPriceChange}
          onMaxChange={handleMaxPriceChange}
          products={products}
        />
      </FilterSection>
    </motion.aside>
  );
};

export default ShopSideBar;
