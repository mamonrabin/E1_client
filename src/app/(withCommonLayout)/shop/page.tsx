
import ShopPagination from "@/src/components/shop/ShopPagination";
import ShopProducts from "@/src/components/shop/ShopProducts";
import ShopSideBar from "@/src/components/shop/ShopSideBar";
import { getAllBrands } from "@/src/services/brand";
import { getAllCategories } from "@/src/services/category";
import { getAllColors } from "@/src/services/colors";
import { getAllFilterProducts } from "@/src/services/products";
import { getAllSize } from "@/src/services/Size";
import PageSection from "@/src/utilits/PageSection";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const normalizeParam = (
    param: string | string[] | undefined
  ) => Array.isArray(param) ? param.join(",") : param || "";

  const category = normalizeParam(params.category);
  const brand = normalizeParam(params.brand);
  const colors = normalizeParam(params.colors);
  const size = normalizeParam(params.size);
  const sortBy = normalizeParam(params.sortBy);

  const minPrice = params.minPrice
    ? Number(params.minPrice)
    : undefined;

  const maxPrice = params.maxPrice
    ? Number(params.maxPrice)
    : undefined;

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Number(params.limit) || 6);

  // Fetch all independent API requests simultaneously
  const [
    productsResponse,
    categoriesResponse,
    brandsResponse,
    colorsResponse,
    sizesResponse,
  ] = await Promise.all([
    getAllFilterProducts({
      category,
      brand,
      colors,
      size,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit,
    }),
    getAllCategories(),
    getAllBrands(),
    getAllColors(),
    getAllSize(),
  ]);

  const products = productsResponse.data;
  const categories = categoriesResponse.data;
  const brands = brandsResponse.data;
  const colores = colorsResponse.data;
  const sizes = sizesResponse.data;

  const total =
    productsResponse?.data.meta?.total ?? products.length;

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
              colores={colores}
              sizes={sizes}
              products={products}
            />
          </div>

          {/* Products */}
          <div className="lg:w-3/4 w-full">
            <ShopProducts
              products={products}
              category={category}
              brand={brand}
              colors={colors}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              page={page}
              limit={limit}
              categories={categories}
              brands={brands}
              colores={colores}
              sizes={sizes}
            />

            <ShopPagination
              page={page}
              limit={limit}
              total={total}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
