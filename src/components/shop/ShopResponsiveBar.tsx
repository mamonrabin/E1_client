
"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SlidersHorizontal } from "lucide-react";

import ShopSideBar from "./ShopSideBar";

import {
  TBrand,
  TCategory,
  TColor,
  TProducts,
  TSize,
} from "@/src/types";

interface ResponsiveProps {
  categories: TCategory[];
  brands: TBrand[];
  colores: TColor[];
  sizes: TSize[];
  products: TProducts[];
}

const ShopResponsiveBar: React.FC<ResponsiveProps> = ({
  categories,
  brands,
  colores,
  sizes,
  products,
}) => {
  return (
    <div className="mb-5 block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-[#202020] transition-all duration-300 hover:border-[#087096] hover:bg-[#087096]/5"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={17} className="text-[#087096]" />
              <span className="text-sm font-semibold">Filter & Sort</span>
            </span>

            <span className="text-xs text-gray-500">
              Refine your search
            </span>
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex w-[90%] max-w-[380px] flex-col gap-0 overflow-hidden border-r border-gray-200 bg-white p-0 sm:w-[380px]"
        >
          <SheetHeader className="border-b border-gray-100 px-5 py-5 text-left">
            <SheetTitle className="flex items-center gap-2 text-base font-semibold text-[#202020]">
              <SlidersHorizontal size={18} className="text-[#087096]" />
              Filter Products
            </SheetTitle>

            <p className="text-xs text-gray-500">
              Find exactly what you are looking for.
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <ShopSideBar
              categories={categories}
              brands={brands}
              colores={colores}
              sizes={sizes}
              products={products}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShopResponsiveBar;
