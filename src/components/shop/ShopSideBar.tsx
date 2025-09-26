/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PriceRange from "./PriceRange";
import { TBanners, TCategory, TColor, TProducts, TSize } from "@/src/types";

interface ShopProps {
  categories:TCategory[]
  brands:TBanners[]
  colors:TColor[]
  sizes:TSize[]
  products:TProducts[]
}

const ShopSideBar:React.FC<ShopProps> = ({ categories, brands, colors, sizes, products }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showAll, setShowAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [collapsed3, setCollapsed3] = useState(false);
  const [collapsed4, setCollapsed4] = useState(false);
  const [collapsed5, setCollapsed5] = useState(false);
  const [collapsed6, setCollapsed6] = useState(false);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  // Sync category params
  useEffect(() => {
    const cats = searchParams.get("category")?.split(",") || [];
    setSelectedCategories(cats);

    const catParam = searchParams.get("category");
    if (catParam) setActiveCategoryId(catParam.split(",")[0]);
  }, [searchParams]);

  // Generic param updater
  const updateParams = (type: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (type === "colors") {
      newParams.set("colors", String(value));
    } else if (type === "minPrice" || type === "maxPrice") {
      newParams.set(type, String(value));
    } else {
      const currentValues = new Set(
        (searchParams.get(type)?.split(",") || []).filter(Boolean)
      );
      if (currentValues.has(String(value))) {
        currentValues.delete(String(value));
      } else {
        currentValues.add(String(value));
      }
      if (currentValues.size > 0) {
        newParams.set(type, Array.from(currentValues).join(","));
      } else {
        newParams.delete(type);
      }
    }

    router.push(`?${newParams.toString()}`);
  };

  const handleMinPriceChange = (min: number) => {
  setMinPrice(min);
  updateParams("minPrice", min);   // ✅ only updates min
};

const handleMaxPriceChange = (max: number) => {
  setMaxPrice(max);
  updateParams("maxPrice", max);   // ✅ only updates max
};

  const uniqueColors = colors?.filter(
    (color: { colorCode: any; }, index: any, self: any[]) =>
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
                  onClick={() => {
                    updateParams("category", category._id);
                    setActiveCategoryId(category._id);
                  }}
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
                  searchParams.get("brand") === brand._id
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
          <div className="flex flex-wrap gap-2 mt-2 capitalize text-sm list-none">
            {sizes?.map((size) => (
              <div
                key={size._id}
                onClick={() => updateParams("size", size._id)}
                className="px-2 py-0.5 bg-primary text-white rounded-sm hover:bg-secondary duration-300 cursor-pointer"
              >
                {size.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
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
                onClick={() => updateParams("colors", color._id)}
                style={{ backgroundColor: color.colorCode }}
                className={`p-3 rounded-full duration-300 cursor-pointer border border-primary/40 ${
                  searchParams.get("colors") === color._id
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
