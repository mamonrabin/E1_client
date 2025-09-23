"use server";

import { apiBaseUrl } from "@/src/config/config";


export const getAllBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/blog`);

  return res.json();
};

export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/blog/blogSlug/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog with slug");
  }

  return res.json();
};

// export const getSingleProductBySlug = async (slug: string) => {
//   const res = await fetch(`${apiBaseUrl}/product/${slug}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch product");
//   }

//   return res.json();
// };