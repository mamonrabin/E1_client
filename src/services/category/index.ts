"use server";

import { apiBaseUrl } from "@/src/config/config";


export const getAllCategories = async () => {
  const res = await fetch(`${apiBaseUrl}/category`);

  return res.json();
};