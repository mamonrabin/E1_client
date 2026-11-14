
"use client";

import CheckoutProducts from "@/src/components/checkout/CheckoutProducts";
import CheckoutForm from "@/src/form/CheckoutForm";
import { useCartStore } from "@/src/store/cartStore";
import PageSection from "@/src/utilits/PageSection";
import React, { useEffect, useState } from "react";
import { districtList } from "@/src/utilits/allDistict";
import { motion } from "framer-motion";
import { LoaderCircle, ShieldCheck } from "lucide-react";

const Page = () => {
  const cart = useCartStore((state) => state.cart);

  const [selectedCity, setSelectedCity] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // Wait for persisted cart hydration
  useEffect(() => {
    let mounted = true;

    const hydrateCart = async () => {
      try {
        await useCartStore.persist.rehydrate();
      } finally {
        if (mounted) {
          setHydrated(true);
        }
      }
    };

    hydrateCart();

    return () => {
      mounted = false;
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
          <LoaderCircle size={35} className="text-primary" />
        </motion.div>

        <p className="text-sm font-medium text-gray-500">
          Preparing your checkout...
        </p>
      </div>
    );
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
    <main className="overflow-hidden">
      {/* Page Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <PageSection second="check out" />
      </motion.div>

      {/* Checkout Content */}
      <div className="Container mt-10 grid gap-8 pb-16 lg:mt-14 lg:grid-cols-2 lg:gap-12">
        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CheckoutForm
            districtList={districtList}
            onCityChange={setSelectedCity}
            subTottalPrice={subTottalPrice}
            shippingCost={shippingCost}
            discount={discount}
            totalCost={totalCost}
            cart={cart}
          />
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-fit"
        >
          <CheckoutProducts
            cart={cart}
            subTottalPrice={subTottalPrice}
            shippingCost={shippingCost}
            totalCost={totalCost}
            discount={discount}
          />

          {/* Secure Checkout Note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            <ShieldCheck size={17} className="text-primary" />
            <span className="text-xs text-gray-500">
              Your information is protected with secure checkout.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Page;
