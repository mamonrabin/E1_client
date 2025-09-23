
import ShopProducts from "@/src/components/shop/ShopProducts";
import ShopSideBar from "@/src/components/shop/ShopSideBar";
import { getAllFilterProducts } from "@/src/services/products";
import PageSection from "@/src/utilits/PageSection";
import React from "react";

const page = async() => {
  const {data:products} = await getAllFilterProducts()
  return (
    <div>
      <PageSection second="shop" />
      <div className="Container py-6">
        <div className="flex xl:gap-8 gap-4">
          <div className="w-1/4 hidden lg:block">
            <ShopSideBar />
          </div>
          <div className="lg:w-3/4 w-full">
            <ShopProducts products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
