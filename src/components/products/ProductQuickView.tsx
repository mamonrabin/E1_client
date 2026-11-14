
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock3,
  Truck,
  ShieldCheck,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  PackageCheck,
  Search,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import payment from "@/src/assets/images/payment-product.png";
import AddBtn from "@/src/utilits/AddBtn";
import { apiBaseUrl } from "@/src/config/config";
import { TProducts } from "@/src/types";
import ColorOrSizeFunction from "./ColorOrSizeFunction";

interface CardProps {
  product: TProducts;
}

const ProductQuickView: React.FC<CardProps> = ({ product }) => {
  const {
    title,
    price,
    mrpPrice,
    thumbal_image,
    description,
    sku,
    stock_status,
    colors,
  } = product;

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Image URL
  const imageUrl = thumbal_image
    ? thumbal_image.startsWith("http")
      ? thumbal_image
      : `${apiBaseUrl}${thumbal_image}`
    : "/placeholder.png";

  // Price formatting
  const formatPrice = (value: number | string) =>
    Number(value).toLocaleString("en-BD");

  const hasPrice = price != null;
  const hasMrp = Number(mrpPrice) > Number(price);

  const stockText = stock_status || "Availability not specified";
  const isOutOfStock = stockText.toLowerCase().includes("out");

  return (
    <Dialog>
      {/* Quick View Trigger */}
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Quick view ${title}`}
          className="group flex h-10 w-10 bg-white cursor-pointer items-center justify-center rounded-full text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white"
        >
          <Search
            size={17}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </button>
      </DialogTrigger>

      {/* Main Dialog */}
      <DialogContent
        className="
          !w-[calc(100vw-24px)]
          !max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          rounded-xl
          border-0
          bg-white
          p-0
          shadow-2xl
          sm:rounded-2xl
          sm:overflow-hidden
        "
      >
        <DialogTitle className="sr-only">
          Quick View: {title}
        </DialogTitle>

        <DialogDescription className="sr-only">
          View product details, pricing, available options and purchase
          information.
        </DialogDescription>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid min-w-0 grid-cols-1 md:h-[min(80vh,720px)] md:grid-cols-2"
        >
          {/* LEFT: IMAGE SECTION */}
          <div className="min-w-0 bg-[#f3f2ef] p-3 sm:p-5 md:p-6">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-xl bg-[#e9e8e5] md:aspect-auto md:h-[calc(min(80vh,720px)-80px)]">
              <motion.div
                initial={{ scale: 1.06, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Image Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* Image Caption */}
              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7">
                <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/75">
                  Explore the collection
                </p>

                <p className="mt-1 max-w-sm text-base font-semibold leading-snug sm:text-xl">
                  {title}
                </p>
              </div>

              {/* Floating Collection Label */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <Sparkles size={12} />
                Premium Collection
              </div>
            </div>

            {/* Image Footer */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Product Preview
              </span>

              <span className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                Discover More
              </span>
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION */}
          <div className="flex min-w-0 flex-col px-5 py-6 sm:px-7 sm:py-7 md:overflow-y-auto md:px-9 md:py-9">
            {/* Heading */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Product Details
              </span>
            </div>

            {/* Product Title */}
            <h2 className="break-words text-2xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-3xl lg:text-[34px]">
              {title}
            </h2>

            {/* Pricing */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {hasPrice && (
                <span className="text-2xl font-bold tracking-tight text-gray-950">
                  ৳{formatPrice(price)}
                </span>
              )}

              {hasMrp && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ৳{formatPrice(mrpPrice)}
                  </span>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Save ৳
                    {formatPrice(Number(mrpPrice) - Number(price))}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-500">
              {description ||
                "Discover this piece from our latest collection."}
            </p>

            {/* SKU & Stock */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-gray-100 py-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOutOfStock ? "bg-red-500" : "bg-emerald-500"
                  }`}
                />

                <span className="capitalize">{stockText}</span>
              </div>

              <div className="text-xs text-gray-400">
                SKU:{" "}
                <span className="font-medium text-gray-700">
                  {sku || "N/A"}
                </span>
              </div>
            </div>

            {/* Color & Size */}
            <div className="mt-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.17em] text-gray-900">
                Select Your Options
              </p>

              <ColorOrSizeFunction
                colors={colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>

            {/* Add to Cart */}
            <div className="mt-6 w-full">
              <AddBtn
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                product={product}
                counterMainStyle="mt-0"
                counterStyle="py-3"
              />
            </div>

            {/* Buy Now */}
            <Link
              href="/checkout"
              className="group mt-3 flex w-full items-center justify-between rounded-lg border border-gray-200 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={15} />
                Buy Now
              </span>

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Benefits */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3.5">
                <Truck size={19} className="mb-2 text-primary" />

                <p className="text-[11px] font-semibold text-gray-800">
                  Reliable Delivery
                </p>

                <p className="mt-1 text-[10px] leading-5 text-gray-400">
                  Delivery details at checkout
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3.5">
                <ShieldCheck size={19} className="mb-2 text-primary" />

                <p className="text-[11px] font-semibold text-gray-800">
                  Secure Checkout
                </p>

                <p className="mt-1 text-[10px] leading-5 text-gray-400">
                  Safe and easy payment
                </p>
              </div>

              <div className="col-span-2 flex items-center gap-3 rounded-xl border border-gray-100 p-3.5">
                <PackageCheck
                  size={21}
                  className="shrink-0 text-primary"
                />

                <div>
                  <p className="text-[11px] font-semibold text-gray-800">
                    Order with Confidence
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-gray-400">
                    Review our shipping and return policies before ordering.
                  </p>
                </div>

                <Clock3
                  size={18}
                  className="ml-auto shrink-0 text-gray-400"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="mt-6 flex flex-col items-center border-t border-gray-100 pt-5">
              <Image
                src={payment}
                alt="Available payment methods"
                width={260}
                height={100}
                className="h-auto max-w-[240px] object-contain"
              />

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Guaranteed Checkout
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
