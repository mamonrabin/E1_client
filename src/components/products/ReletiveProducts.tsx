
import { getRelativeProducts } from "@/src/services/products";
import ProductSlider from "@/src/slider/ProductSlider";
import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const ReletiveProducts = async ({ id }: { id: string }) => {
  const { data: products } = await getRelativeProducts(id);

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-14 overflow-hidden border-t border-gray-100 pt-10 sm:mt-20 sm:pt-14">
      {/* Section Heading */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-primary" />
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              <Sparkles size={12} className="text-primary" />
              Curated For You
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
            You May Also <span className="text-primary">Like</span>
          </h2>

          <p className="mt-2 max-w-md text-xs leading-6 text-gray-500 sm:text-sm">
            Discover more styles selected to complement your taste.
          </p>
        </div>

        <div className="hidden items-center gap-2 text-xs font-medium text-gray-400 sm:flex">
          Explore more
          <ArrowRight size={15} className="text-primary" />
        </div>
      </div>

      {/* Products Slider */}
      <div className="relative">
        <ProductSlider products={products} />
      </div>

      {/* Bottom Accent */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <span className="h-1 w-8 rounded-full bg-primary" />
        <span className="h-1 w-1 rounded-full bg-gray-200" />
        <span className="h-1 w-1 rounded-full bg-gray-200" />
      </div>
    </section>
  );
};

export default ReletiveProducts;
