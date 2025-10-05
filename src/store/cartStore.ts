/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  _id?: string;
  color?: string;
  size?: string;
  product: any;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  clearCart: () => void;
}

// Dummy storage for SSR (prevents localStorage error on server)
const dummyStorage = {

  getItem: (_: string) => null,
  setItem: (_: string, __: string) => {},
  removeItem: (_: string) => {},
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      setCart: (items) => set({ cart: items }),

      addToCart: (item) => {
        const exists = get().cart.find(
          (i) =>
            (i.product?._id || i.product) === (item.product?._id || item.product) &&
            i.color === item.color &&
            i.size === item.size
        );

        if (exists) {
          set((state) => ({
            cart: state.cart.map((i) =>
              (i.product?._id || i.product) === (item.product?._id || item.product) &&
              i.color === item.color &&
              i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, item],
          }));
        }
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            (item.product?._id || item.product) === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      removeFromCart: (productId, color?, size?) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                (item.product?._id || item.product) === productId &&
                (color ? item.color === color : true) &&
                (size ? item.size === size : true)
              )
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return dummyStorage;
      }),
      skipHydration: true, // 👈 prevents hydration mismatch
    }
  )
);
