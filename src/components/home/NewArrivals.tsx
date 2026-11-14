
import ProductSlider from "@/src/slider/ProductSlider";
import { TProducts } from "@/src/types";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface NewProductsProps {
  products: TProducts[];
}

const NewArrivals: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <section className="Container  py-8  sm:py-10">
      {/* Section Header */}
      <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[2px] w-7 bg-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              Just Arrived
            </p>
          </div>

          <h2 className="text-2xl font-semibold uppercase tracking-tight text-gray-900 sm:text-3xl">
            New Arrivals
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Discover our latest styles and fresh collections.
          </p>
        </div>

        <Link
          href="/shop"
          className="group mb-1 flex shrink-0 items-center gap-2 border-b border-gray-300 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-800 transition-colors hover:border-primary hover:text-primary sm:text-xs"
        >
          View All
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Products */}
      {products?.length > 0 ? (
        <ProductSlider products={products} />
      ) : (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg bg-gray-50 px-4 text-center">
          <p className="text-base font-medium text-gray-700">
            No new products available
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Check back soon for our latest collections.
          </p>
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
