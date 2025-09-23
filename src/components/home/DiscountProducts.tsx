

import ProductSlider from "@/src/slider/ProductSlider";
import { TProducts } from "@/src/types";
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

export default DiscountProducts;
