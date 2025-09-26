/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LayoutGrid, Rows3 } from "lucide-react";
import React, { useEffect, useState } from "react";

import ProductCard from "../products/ProductCard";
import RowProductCard from "../products/RowProductCard";
import SortShop from "./SortShop";
import ShopResponsiveBar from "./ShopResponsiveBar";
import { TProducts } from "@/src/types";
import { getAllFilterProducts } from "@/src/services/products";

interface ProductProps {
  products: TProducts[];
  category: string;
  brand: string;
  colors: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page: number;   // ✅ added
  limit: number;  // ✅ added
}

const ShopProducts: React.FC<ProductProps> = ({
  products,
  category,
  brand,
  colors,
  minPrice,
  maxPrice,
  sortBy,
  page,
  limit,
}) => {
  const [viewType, setViewType] = useState<"grid" | "row">("grid");
  const [allProducts, setAllProducts] = useState<TProducts[]>(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters: any = {};
        if (category) filters.category = category;
        if (brand) filters.brand = brand;
        if (colors) filters.colors = colors;
        if (minPrice) filters.minPrice = minPrice;
        if (maxPrice) filters.maxPrice = maxPrice;
        if (sortBy) filters.sortBy = sortBy;
        if (page) filters.page = page;     // ✅ include
        if (limit) filters.limit = limit;  // ✅ include

        const res = await getAllFilterProducts(filters);
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category, brand, colors, minPrice, maxPrice, sortBy, page, limit]); // ✅ dependencies updated

  return (
    <div>
      {/* Responsive filter bar for mobile */}
      <div className="lg:hidden">
        <ShopResponsiveBar />
      </div>

      {/* Top bar with view + sort controls */}
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

          {/* ✅ Sorting dropdown */}
          <SortShop currentSort={sortBy} />
        </div>
      </div>

      {/* Products grid / row */}
      {viewType === "grid" ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-4">
          {allProducts?.map((product) => (
            <RowProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopProducts;
