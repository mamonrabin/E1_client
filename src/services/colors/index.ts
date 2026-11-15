"use server";

import { apiBaseUrl } from "@/src/config/config";


export const getAllColors = async () => {
  const res = await fetch(`${apiBaseUrl}/color`,{
    next: {
      revalidate: 3600,
    },
  });

  return res.json();
};