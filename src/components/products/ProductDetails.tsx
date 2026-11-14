
"use client";

import AddBtn from "@/src/utilits/AddBtn";
import ShippingInfo from "@/src/utilits/ShippingInfo";
import {
  Facebook,
  Instagram,
  LockKeyhole,
  ShieldCheck,
  Truck,
  Twitter,
  PackageCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

import ColorOrSizeFunction from "./ColorOrSizeFunction";
import payment from "@/src/assets/payment/payment.jpg";
import { TProducts } from "@/src/types";

interface ProductProps {
  product: TProducts;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const originalPrice = Number(product.mrpPrice);
  const currentPrice = Number(product.price);

  const discount =
    originalPrice > currentPrice && originalPrice > 0
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const isAvailable =
    String(product.stock_status).toLowerCase() === "in stock";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="w-full"
    >
      <div className="space-y-5 px-1 sm:px-2">
        {/* Product Heading */}
        <motion.div variants={fadeUp}>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[2px] w-7 bg-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              Product Details
            </span>
          </div>

          <h1 className="text-xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-2xl lg:text-[28px]">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              ৳{product.price}
            </span>

            {product.mrpPrice && (
              <span className="text-base text-gray-400 line-through">
                ৳{product.mrpPrice}
              </span>
            )}

            {discount > 0 && (
              <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                {discount}% OFF
              </span>
            )}
          </div>
        </motion.div>

        {/* Description */}
        {product.description && (
          <motion.p
            variants={fadeUp}
            className="text-sm leading-7 text-gray-500"
          >
            {product.description}
          </motion.p>
        )}

        {/* Product Information */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-gray-100 py-4"
        >
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-800">SKU:</span>
            <span>{product.sku || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            <span
              className={`font-medium ${
                isAvailable ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {product.stock_status || "Availability unknown"}
            </span>
          </div>
        </motion.div>

        {/* Color and Size Selection */}
        <motion.div variants={fadeUp}>
          <ColorOrSizeFunction
            colors={product.colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </motion.div>

        {/* Add to Cart */}
        <motion.div variants={fadeUp} className="space-y-3 pt-1">
          <AddBtn
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            product={product}
            counterMainStyle="mt-2"
            counterStyle="py-3 md:w-[45%] w-[45%]"
          />

          <Link
            href="/checkout"
            className="group flex w-full items-center justify-center gap-3 rounded-md bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            Buy Now
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <p className="text-center text-[11px] text-gray-400">
            <LockKeyhole size={12} className="mr-1 inline-block" />
            Secure checkout · Easy shopping
          </p>
        </motion.div>

        {/* Shipping Information */}
        <motion.div variants={fadeUp}>
          <ShippingInfo />
        </motion.div>

        {/* Customer Benefits */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:grid-cols-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              <LockKeyhole size={17} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Secure Payment
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Safe checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              <BadgeCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Quality Assured
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Trusted products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              <Truck size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Fast Delivery
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Across Bangladesh
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social Sharing */}
        <motion.div variants={fadeUp}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Share this product
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0866FF] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Facebook size={16} fill="white" />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Instagram size={17} />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Twitter size={16} />
            </a>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          variants={fadeUp}
          className="relative mt-5 rounded-xl border border-gray-200 px-4 pb-3 pt-5"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <ShieldCheck size={15} className="text-primary" />
              Guarantee Safe Checkout
            </span>
          </div>

          <Image
            src={payment}
            alt="Available payment methods"
            width={350}
            height={350}
            className="mx-auto max-h-20 w-auto object-contain"
          />

          <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
            <PackageCheck size={13} />
            Your payment information is protected
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
