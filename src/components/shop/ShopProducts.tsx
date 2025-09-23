"use client";
import { LayoutGrid, Rows3 } from "lucide-react";
import React, { useState } from "react";

import ProductCard from "../products/ProductCard";

import RowProductCard from "../products/RowProductCard";
import SortShop from "./SortShop";
import ShopResponsiveBar from "./ShopResponsiveBar";
import ShopPagination from "./ShopPagination";
import { TProducts } from "@/src/types";

interface productProps {
  products:TProducts[]
}

const ShopProducts:React.FC<productProps> = ({products}) => {
  const [viewType, setViewType] = useState<"grid" | "row">("grid");

  return (
    <div>
      <div className="lg:hidden">
        <ShopResponsiveBar />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-primary">View All Products</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType("grid")}
            className={`sm:flex hidden p-2 rounded border ${
              viewType === "grid"
                ? "bg-primary text-white"
                : "border-primary/40 text-primary"
            } hover:bg-primary hover:text-white cursor-pointer duration-300`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewType("row")}
            className={`sm:flex hidden p-2 rounded border ${
              viewType === "row"
                ? "bg-primary text-white"
                : "border-primary/40 text-primary"
            } hover:bg-primary hover:text-white cursor-pointer duration-300`}
          >
            <Rows3 size={16} />
          </button>

          <SortShop />
        </div>
      </div>

      {viewType === "grid" ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-4">
          {products?.map((product) => (
            // <RowProductCard key={product.id} product={product} />
            <RowProductCard key={product._id} />
          ))}
        </div>
      )}

      <div>
        <ShopPagination />
      </div>
    </div>
  );
};

export default ShopProducts;
