import ShopProducts from "@/src/components/shop/ShopProducts";
import ShopSideBar from "@/src/components/shop/ShopSideBar";
import { getAllBrands } from "@/src/services/brand";
import { getAllCategories } from "@/src/services/category";
import { getAllColors } from "@/src/services/colors";
import { getAllFilterProducts } from "@/src/services/products";
import { getAllSize } from "@/src/services/Size";
import PageSection from "@/src/utilits/PageSection";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const normalizeParam = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param.join(",") : param || "";

  const category = normalizeParam(params.category);
  const brand = normalizeParam(params.brand);
  const colors = normalizeParam(params.colors);

  

  const { data: products } = await getAllFilterProducts({ category, brand, colors }); 
  const { data: categories } = await getAllCategories();
  const { data: brands } = await getAllBrands();
  const { data: colores } = await getAllColors();
  const { data: sizes } = await getAllSize();

  return (
    <div>
      <PageSection second="shop" />
      <div className="Container py-6">
        <div className="flex xl:gap-8 gap-4">
          {/* Sidebar */}
          <div className="w-1/4 hidden lg:block">
            <ShopSideBar categories={categories} brands={brands} colors={colores} sizes={sizes} />
          </div>

          {/* Products */}
          <div className="lg:w-3/4 w-full">
            <ShopProducts products={products} category={category} brand={brand} colors={colors}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;



