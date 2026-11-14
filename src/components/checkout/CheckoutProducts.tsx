/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FilePenLine,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { apiBaseUrl } from "@/src/config/config";

interface CheckoutProductsProps {
  cart: any[];
  subTottalPrice: number;
  shippingCost: number;
  discount: number;
  totalCost: number;
  onRemove?: (item: any) => void;
}

const CheckoutProducts: React.FC<CheckoutProductsProps> = ({
  cart,
  subTottalPrice,
  shippingCost,
  totalCost,
  discount,
  onRemove,
}) => {
  const getImageUrl = (image?: string) => {
    if (!image) return "/placeholder.png";

    return image.startsWith("http")
      ? image
      : `${apiBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  const formatPrice = (price: number) =>
    `৳ ${Number(price || 0).toLocaleString("en-BD")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag size={19} className="text-primary" />
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Order Summary
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your bag
          </p>
        </div>

        <Link
          href="/cart"
          className="group flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-primary hover:bg-primary hover:text-white"
        >
          <FilePenLine size={14} />
          Edit Cart
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Products */}
      <div className="space-y-4 border-b border-gray-100 px-5 py-5 sm:px-6">
        <AnimatePresence mode="popLayout">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <motion.div
                key={
                  item.id ||
                  `${item.product?._id}-${item.color}-${item.size}-${index}`
                }
                layout
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15, height: 0 }}
                transition={{ duration: 0.25 }}
                className="group flex gap-3"
              >
                <div className="relative h-[92px] w-[78px] shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={getImageUrl(item?.product?.thumbal_image)}
                    alt={item?.product?.title || "Product"}
                    fill
                    sizes="78px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900">
                      {item?.product?.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                      {item.size && (
                        <span>
                          Size: <span className="text-gray-800">{item.size}</span>
                        </span>
                      )}
                      {item.color && (
                        <span>
                          Color: <span className="text-gray-800">{item.color}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-primary">
                      {formatPrice(
                        Number(item?.product?.price || 0) *
                          Number(item.quantity || 1)
                      )}
                    </p>

                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        aria-label={`Remove ${item?.product?.title || "product"}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-8 text-center">
              <ShoppingBag className="mx-auto mb-3 text-gray-300" size={32} />
              <p className="text-sm font-medium text-gray-700">
                Your cart is empty
              </p>
              <Link
                href="/shop"
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Details */}
      <div className="space-y-3 px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatPrice(subTottalPrice)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-500">
            <Truck size={15} />
            Shipping
          </span>
          <span className="font-medium text-gray-900">
            {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Discount</span>
          <span className="font-medium text-green-600">
            - {formatPrice(discount)}
          </span>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Total Amount
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400">
                Inclusive of applicable charges
              </p>
            </div>

            <motion.p
              key={totalCost}
              initial={{ opacity: 0.5, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold tracking-tight text-primary"
            >
              {formatPrice(totalCost)}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Trust Information */}
      <div className="grid grid-cols-2 gap-3 border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="shrink-0 text-primary" />
          <span className="text-[11px] font-medium text-gray-600">
            Secure Checkout
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PackageCheck size={18} className="shrink-0 text-primary" />
          <span className="text-[11px] font-medium text-gray-600">
            Quality Assured
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutProducts;
