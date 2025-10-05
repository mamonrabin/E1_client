/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PriceRange from "./PriceRange";
import { TBrand, TCategory, TColor, TProducts, TSize } from "@/src/types";
import SizeFiltering from "./SizeFiltering";

interface ShopProps {
  categories: TCategory[];
  brands: TBrand[];
  colores: TColor[];
  sizes: TSize[];
  products: TProducts[];
}

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
  const [collapsed, setCollapsed] = useState(false);
  const [collapsed3, setCollapsed3] = useState(false);
  const [collapsed4, setCollapsed4] = useState(false);
  const [collapsed5, setCollapsed5] = useState(false);
  const [collapsed6, setCollapsed6] = useState(false);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);
  const [activeSizeId, setActiveSizeId] = useState<string | null>(null);

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [priceChanged, setPriceChanged] = useState(false); // ✅ Track user interaction

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  // ✅ Sync category, brand, and size params
  useEffect(() => {
    setActiveCategoryId(searchParams.get("category"));
    setActiveBrandId(searchParams.get("brand"));
    setActiveSizeId(searchParams.get("size"));
  }, [searchParams]);

  // ✅ Universal param updater
  const updateParams = (type: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const strValue = String(value);

    if (["category", "brand", "size"].includes(type)) {
      const currentValue = searchParams.get(type);
      if (currentValue === strValue) {
        newParams.delete(type);
        if (type === "category") setActiveCategoryId(null);
        if (type === "brand") setActiveBrandId(null);
        if (type === "size") setActiveSizeId(null);
      } else {
        newParams.set(type, strValue);
        if (type === "category") setActiveCategoryId(strValue);
        if (type === "brand") setActiveBrandId(strValue);
        if (type === "size") setActiveSizeId(strValue);
      }
    } else if (type === "colores") {
      newParams.set("colores", strValue);
    } else if (type === "minPrice" || type === "maxPrice") {
      newParams.set(type, strValue);
    }

    router.push(`?${newParams.toString()}`);
  };

  // ✅ Only update URL when user changes price manually
  useEffect(() => {
    if (priceChanged && minPrice !== null && maxPrice !== null) {
      updateParams("minPrice", minPrice);
      updateParams("maxPrice", maxPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  const handleMinPriceChange = (min: number) => {
    setMinPrice(min);
    setPriceChanged(true);
  };

  const handleMaxPriceChange = (max: number) => {
    setMaxPrice(max);
    setPriceChanged(true);
  };

  const uniqueColors = colores?.filter(
    (color, index, self) =>
      index === self.findIndex((c) => c.colorCode === color.colorCode)
  );

  return (
    <div>
      {/* Categories */}
      <div className="border border-primary/20 p-6 rounded-sm">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <h2 className="text-base font-medium text-primary">Categories</h2>
          {collapsed ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed && (
          <div className="flex flex-col gap-2 mt-2">
            {visibleCategories.map((category) => (
              <ul key={category._id}>
                <li
                  onClick={() => updateParams("category", category._id)}
                  className={`text-sm capitalize cursor-pointer hover:text-primary duration-300 ${
                    activeCategoryId === category._id
                      ? "text-primary font-semibold"
                      : ""
                  }`}
                >
                  {category.title}
                </li>
              </ul>
            ))}

            {categories.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-primary hover:underline w-fit duration-300 cursor-pointer"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed3(!collapsed3)}
        >
          <h2 className="text-base font-medium text-primary">Brand</h2>
          {collapsed3 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed3 && (
          <div className="flex flex-col gap-2 mt-2">
            {brands?.map((brand) => (
              <div
                key={brand._id}
                onClick={() => updateParams("brand", brand._id)}
                className={`text-sm capitalize cursor-pointer hover:text-primary duration-300 ${
                  activeBrandId === brand._id
                    ? "text-primary font-semibold"
                    : ""
                }`}
              >
                {brand.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed4(!collapsed4)}
        >
          <h2 className="text-base font-medium text-primary">Size</h2>
          {collapsed4 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed4 && (
          <SizeFiltering sizes={sizes} updateParams={updateParams} />
        )}
      </div>

      {/* Color */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed5(!collapsed5)}
        >
          <h2 className="text-base font-medium text-primary">Color</h2>
          {collapsed5 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed5 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {uniqueColors?.map((color) => (
              <div
                key={color._id}
                onClick={() => updateParams("colores", color._id)}
                style={{ backgroundColor: color.colorCode }}
                className={`p-3 rounded-full duration-300 cursor-pointer border border-primary/40 ${
                  searchParams.get("colores") === color._id
                    ? "ring-2 ring-primary scale-110"
                    : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed6(!collapsed6)}
        >
          <h2 className="text-base font-medium text-primary capitalize">
            Price Range
          </h2>
          {collapsed6 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed6 && (
          <div className="mt-2">
            <PriceRange
              minPrice={minPrice ?? 0}
              maxPrice={maxPrice ?? 0}
              onMinChange={handleMinPriceChange}
              onMaxChange={handleMaxPriceChange}
              products={products}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSideBar;
