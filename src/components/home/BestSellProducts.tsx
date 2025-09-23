

import ProductSlider from "@/src/slider/ProductSlider";
import { TProducts } from "@/src/types";
import React from "react";

interface BestSellProductsProps {
  products: TProducts[];
}

const BestSellProducts:React.FC<BestSellProductsProps> = ({products}) => {
  return (
    <div className="Container py-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl text-lg font-medium uppercase">
          Best Sellers
        </h2>
        <p className="font-medium capitalize border-primary/40 border-b cursor-pointer bounce-x-hover">
          View All
        </p>
      </div>

      <div className="mt-4">
        <ProductSlider products={products} />
      </div>
    </div>
  );
};

export default BestSellProducts;
