"use client";
export const dynamic = "force-dynamic";

import CheckoutProducts from "@/src/components/checkout/CheckoutProducts";
import CheckoutForm from "@/src/form/CheckoutForm";
import { useCartStore } from "@/src/store/cartStore";
import PageSection from "@/src/utilits/PageSection";
import React, { useEffect, useState } from "react";
import { districtList } from "@/src/utilits/allDistict";

const Page = () => {
  const cart = useCartStore((state) => state.cart);
  const [selectedCity, setSelectedCity] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // ✅ ensure store is rehydrated before rendering
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div>Loading checkout...</div>; // prevent empty cart flash
  }

  const subTottalPrice = cart.reduce((acc, item) => {
    const price = Number(item.product?.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost =
    selectedCity.toLowerCase() === "dhaka" ? 60 : selectedCity ? 120 : 0;

  const discount = 0;
  const totalCost = subTottalPrice + shippingCost - discount;

  return (
    <div>
      <PageSection second="check out" />
      <div className="Container grid lg:grid-cols-2 gap-12 mt-12">
        <div>
          <CheckoutForm
            districtList={districtList}
            onCityChange={setSelectedCity}
            subTottalPrice={subTottalPrice}
            shippingCost={shippingCost}
            discount={discount}
            totalCost={totalCost}
            cart={cart}
          />
        </div>
        <div>
          <CheckoutProducts
            cart={cart}
            subTottalPrice={subTottalPrice}
            shippingCost={shippingCost}
            totalCost={totalCost}
            discount={discount}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
