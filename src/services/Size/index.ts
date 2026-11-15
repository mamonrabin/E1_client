"use server";

import { apiBaseUrl } from "@/src/config/config";


export const getAllSize = async () => {
  const res = await fetch(`${apiBaseUrl}/size`,{
    next: {
      revalidate: 3600,
    },
  });

  return res.json();
};