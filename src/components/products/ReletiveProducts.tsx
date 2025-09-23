

import { getRelativeProducts } from "@/src/services/products";
import ProductSlider from "@/src/slider/ProductSlider";
import React from "react";

const ReletiveProducts = async({ id }: { id: string }) => {

  const {data:products} = await getRelativeProducts(id)

  return (
    <div className="mt-12">
      <div className="">
        <h2 className="font-semibold text-primary md:text-lg text-sm">
          RELETIVE PRODUCTS
        </h2>
      </div>

      <div className="mt-6">
        <ProductSlider products={products} />
      </div>
    </div>
  );
};

export default ReletiveProducts;
