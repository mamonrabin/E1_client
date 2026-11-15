"use server";

import { apiBaseUrl } from "@/src/config/config";


export const getAllBrands = async () => {
  const res = await fetch(`${apiBaseUrl}/brand`, {
    next: {
      revalidate: 3600,
    },
  });

  return res.json();
};