import ShopPagination from "@/src/components/shop/ShopPagination";
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
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const params = await Promise.resolve(searchParams);

  const normalizeParam = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param.join(",") : param || "";

  const category = normalizeParam(params.category);
  const brand = normalizeParam(params.brand);
  const colors = normalizeParam(params.colors);
  const size = normalizeParam(params.size);
  const sortBy = normalizeParam(params.sortBy);

  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  // ✅ Default page = 1, limit = 6

  const page = params.page ? Number(params.page) : 1;
const limit = params.limit ? Number(params.limit) : 6;

  const { data: products } = await getAllFilterProducts({
    category,
    brand,
    colors,
    size,
    minPrice,
    maxPrice,
    sortBy,
    page,
    limit,
  });

  console.log("meta",products.data)

  const { data: categories } = await getAllCategories();
  const { data: brands } = await getAllBrands();
  const { data: colores } = await getAllColors();
  const { data: sizes } = await getAllSize();

  // ✅ fallback if meta.total is missing
  const total = products.meta?.total ?? products.data.length;

  return (
    <div>
      <PageSection second="shop" />
      <div className="Container py-6">
        <div className="flex xl:gap-8 gap-4">
          {/* Sidebar */}
          <div className="w-1/4 hidden lg:block">
            <ShopSideBar
              categories={categories}
              brands={brands}
              colors={colores}
              sizes={sizes}
              products={products.data}
            />
          </div>

          {/* Products */}
          <div className="lg:w-3/4 w-full">
            <ShopProducts
              products={products.data}
              category={category}
              brand={brand}
              colors={colors}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              page={page}
              limit={limit}
            />

            <div>
              {/* ✅ Pagination */}
              <ShopPagination page={page} limit={limit} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
