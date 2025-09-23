"use server";

import { apiBaseUrl } from "@/src/config/config";


export const getAllBanners = async () => {
  const res = await fetch(`${apiBaseUrl}/banner`);

  return res.json();
};