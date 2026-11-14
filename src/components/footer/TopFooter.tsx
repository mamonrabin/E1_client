
"use client";

import React from "react";
import {
  Truck,
  RefreshCcw,
  Headset,
  CreditCard,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ৳2,000",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Simple return & exchange",
  },
  {
    icon: Headset,
    title: "Online Support",
    description: "We're here to help",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options",
  },
];

const TopFooter = () => {
  return (
    <section className="border-y border-[#087096]/10 bg-[#F7F7F5] py-7 md:py-9">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-0">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center justify-center gap-3 px-3 md:px-5 ${
                  index !== 0
                    ? "md:border-l md:border-[#202020]/10"
                    : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#087096]/10 text-[#087096]">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#202020] md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#202020]/55 md:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopFooter;
