"use server";

import { apiBaseUrl } from "@/src/config/config";
import { TCart } from "@/src/types";


export const createCart = async (cartData : TCart) => {
  try {
    const res = await fetch(`${apiBaseUrl}/cart/create-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!res.ok) {
      throw new Error(`Create cart failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const getAllCartsByUser = async (userId: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/cart/user/${userId}`,{ cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch carts for user: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const getAllCarts = async () => {
  const res = await fetch(`${apiBaseUrl}/cart`);

  return res.json();
};

export const deleteCart = async (cartId: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/cart/${cartId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete cart: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
};
