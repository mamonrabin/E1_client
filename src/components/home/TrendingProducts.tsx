

import ProductSlider from "@/src/slider/ProductSlider";
import { TProducts } from "@/src/types";
import Link from "next/link";
import React from "react";

interface trandingProps {
  products:TProducts[]
}

const TrendingProducts:React.FC<trandingProps> = ({products}) => {
  return (
    <div className="Container py-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl text-lg font-medium uppercase">
          Trending Now
        </h2>
        <Link href="/shop">
        <p className="font-medium capitalize border-primary/40 border-b cursor-pointer bounce-x-hover">
          View All
        </p>
        </Link>
      </div>

      <div className="mt-4">
        {products && products.length > 0 ? (
          <ProductSlider products={products} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            There are no products.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
