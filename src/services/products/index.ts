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
export const getAllFilterProducts = async () => {
  
  const res = await fetch(`${apiBaseUrl}/product/pagination`);

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