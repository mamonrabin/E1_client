"use client";

import { useEffect } from "react";
import { useCartStore } from "@/src/store/cartStore";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, [setCart]);

  return <>{children}</>;
}
