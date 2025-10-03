

import ProductSlider from "@/src/slider/ProductSlider";
import { TProducts } from "@/src/types";
import Link from "next/link";
import React from "react";

interface discountProductProps {
  products:TProducts[]
}

const DiscountProducts:React.FC<discountProductProps> = ({products}) => {
  return (
    <div className="Container">
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl text-lg font-medium uppercase">
          Discount Products
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

export default DiscountProducts;
