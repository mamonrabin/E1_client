
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid, Rows3, PackageSearch } from "lucide-react";

import ProductCard from "../products/ProductCard";
import RowProductCard from "../products/RowProductCard";
import SortShop from "./SortShop";
import ShopResponsiveBar from "./ShopResponsiveBar";

import {
  TBrand,
  TCategory,
  TColor,
  TProducts,
  TSize,
} from "@/src/types";
import { getAllFilterProducts } from "@/src/services/products";

interface ProductProps {
  products: TProducts[];
  category: string;
  brand: string;
  colors: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page: number;
  limit: number;
  categories: TCategory[];
  brands: TBrand[];
  colores: TColor[];
  sizes: TSize[];
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
  categories,
  brands,
  colores,
  sizes,
}) => {
  const [viewType, setViewType] = useState<"grid" | "row">("grid");
  const [allProducts, setAllProducts] = useState<TProducts[]>(products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const filters: Record<string, any> = {
          page,
          limit,
        };

        if (category) filters.category = category;
        if (brand) filters.brand = brand;
        if (colors) filters.colors = colors;
        if (minPrice !== undefined) filters.minPrice = minPrice;
        if (maxPrice !== undefined) filters.maxPrice = maxPrice;
        if (sortBy) filters.sortBy = sortBy;

        const res = await getAllFilterProducts(filters);

        if (isMounted) {
          setAllProducts(res?.data?.data ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch shop products:", error);

        if (isMounted) {
          setAllProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [
    category,
    brand,
    colors,
    minPrice,
    maxPrice,
    sortBy,
    page,
    limit,
  ]);

  return (
    <section className="w-full">
      {/* Mobile filters */}
      <div className="mb-5 lg:hidden">
        <ShopResponsiveBar
          categories={categories}
          brands={brands}
          colores={colores}
          sizes={sizes}
          products={products}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-base font-semibold text-[#202020]">
            All Products
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Explore our latest collection
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View switcher */}
          <div className="hidden items-center gap-1 rounded-lg border border-gray-200 p-1 sm:flex">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={viewType === "grid"}
              onClick={() => setViewType("grid")}
              className={`rounded-md p-2 transition-colors ${
                viewType === "grid"
                  ? "bg-[#087096] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid size={17} />
            </button>

            <button
              type="button"
              aria-label="List view"
              aria-pressed={viewType === "row"}
              onClick={() => setViewType("row")}
              className={`rounded-md p-2 transition-colors ${
                viewType === "row"
                  ? "bg-[#087096] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Rows3 size={17} />
            </button>
          </div>

          <SortShop currentSort={sortBy} />
        </div>
      </div>

      {/* Product content */}
      <div className="relative min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-20 backdrop-blur-[2px]">
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#087096]" />
              <span className="text-sm font-medium text-gray-600">
                Updating products...
              </span>
            </div>
          </div>
        )}

        {!loading && allProducts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#087096]/10 text-[#087096]">
              <PackageSearch size={30} strokeWidth={1.5} />
            </div>

            <h3 className="text-lg font-semibold text-[#202020]">
              No products found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              We couldn&apos;t find products matching your selected filters.
              Try adjusting or clearing your filters.
            </p>
          </div>
        ) : viewType === "grid" ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {allProducts.map((product) => (
              <RowProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopProducts;
