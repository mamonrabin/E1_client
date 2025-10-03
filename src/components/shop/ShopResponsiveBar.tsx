"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Funnel } from "lucide-react";
import ShopSideBar from "./ShopSideBar";
import { TBrand, TCategory, TColor, TProducts, TSize } from "@/src/types";

interface ResponsiveProps {
    categories:TCategory[];
      brands:TBrand[];
      colores:TColor[];
      sizes:TSize[];
      products: TProducts[];
}

const ShopResponsiveBar:React.FC<ResponsiveProps> = ({categories,brands,colores,sizes,products}) => {
  return (
    <div className="lg:hidden block">
      <Sheet>
        <SheetTrigger className="cursor-pointer">
          <p className="inline-flex items-center gap-1 bg-primary hover:bg-secondary cursor-pointer duration-300 text-white px-2 py-1 rounded">
            <span>
              <Funnel size={16} />
            </span>
            <span className="text-sm capitalize">filter</span>
          </p>
        </SheetTrigger>
        <SheetContent side="left" className="px-4 py-4 overflow-y-scroll">
        <ShopSideBar categories={categories} brands={brands} colores={colores} sizes={sizes} products={products}/>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShopResponsiveBar;
