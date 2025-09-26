/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiBaseUrl } from "@/src/config/config";


// export const getAllProducts = async () => {
//   const res = await fetch(`${apiBaseUrl}/products`);

//   return res.json();
// };

export const getAllProducts = async (params: Record<string, any> = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${apiBaseUrl}/products?${queryString}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};




export const getAllFilterProducts = async (filters: {
  category?: string;
  brand?: string;
  size?: string;
  colors?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
} = {}) => {
  const searchParams = new URLSearchParams();

  if (filters.category) {
    filters.category.split(",").forEach((cat) => {
      searchParams.append("category", cat);
    });
  }

  if (filters.brand) {
    filters.brand.split(",").forEach((brand) => {
      searchParams.append("brand", brand);
    });
  }

  if (filters.size) {
    filters.size.split(",").forEach((size) => {
      searchParams.append("size", size);
    });
  }

   if (filters.colors) {
    filters.colors.split(",").forEach((colors) => {
      searchParams.append("colors", colors);
    });
  }


  if (filters.minPrice !== undefined) {
    searchParams.append("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    searchParams.append("maxPrice", String(filters.maxPrice));
  }

   if (filters.sortBy) {
    searchParams.append("sortBy", filters.sortBy); // ✅ added
  }

  if (filters.page) searchParams.append("page", String(filters.page));
  if (filters.limit) searchParams.append("limit", String(filters.limit));

 

  const url = `${apiBaseUrl}/product/pagination?${searchParams.toString()}`;
  console.log("params", url);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};


export const getAllNewProducts = async () =>{
 const res = await fetch(`${apiBaseUrl}/product/new-arrivals?limit=6`);
 return res.json();
}

export const getAllTrendingProducts = async () =>{
 const res = await fetch(`${apiBaseUrl}/product/best-sellers?limit=6`);
 return res.json();
}
export const getAllDiscountProducts = async () =>{
 const res = await fetch(`${apiBaseUrl}/product/discount-products?limit=6`);
 return res.json();
}

export const getProductBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/product/productSlug/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product with slug");
  }

  return res.json();
};
export const getRelativeProducts = async (id: string) => {
  const res = await fetch(`${apiBaseUrl}/product/related/${id}`);


  if (!res.ok) {
    throw new Error("Failed to fetch relative product");
  }

  return res.json();
};



export const getProductById = async (id: number | string) => {
  const res = await fetch(`${apiBaseUrl}/products/${id}`);
  return res.json();
};