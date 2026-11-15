
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Heart,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import ProductQuickView from "./ProductQuickView";
import { apiBaseUrl } from "@/src/config/config";
import { TProducts } from "@/src/types";
import { useCartStore } from "@/src/store/cartStore";

interface CardProps {
  product: TProducts;
}

const RowProductCard: React.FC<CardProps> = ({ product }) => {
  const {
    title,
    price,
    mrpPrice,
    category,
    thumbal_image,
    backview_image,
    label,
    discount,
    slug,
  } = product;

  const addToCart = useCartStore((state) => state.addToCart);

  const imageUrl = (image?: string) =>
    image
      ? image.startsWith("http")
        ? image
        : `${apiBaseUrl}${image}`
      : "/placeholder.png";

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity: 1,
    });

    toast.success(`${title} added to cart!`, {
      duration: 1200,
      position: "top-right",
    });
  };

  return (
    <article className="group w-full">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f5f5f3]">

        <Link
          href={`/product/${slug}`}
          className="absolute inset-0 block"
        >
          {/* Main Image */}
          <Image
            src={imageUrl(thumbal_image)}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Hover Image */}
          {backview_image && (
            <Image
              src={imageUrl(backview_image)}
              alt={`${title} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
          {label && (
            <span className="bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-800 shadow-sm backdrop-blur-sm sm:text-[10px]">
              {label}
            </span>
          )}

          {discount ? (
            <span className="bg-[#087096] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm sm:text-[10px]">
              -{discount}% OFF
            </span>
          ) : null}
        </div>

        {/* Wishlist */}
        <div className="absolute right-3 top-3 z-10">
          <button
            type="button"
            aria-label="Add to wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#087096] hover:text-white"
          >
            <Heart size={17} strokeWidth={1.7} />
          </button>
        </div>

        {/* Quick View */}
        <div className="absolute bottom-3 right-3 z-10 opacity-100 transition-all duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-colors hover:bg-[#087096] hover:text-white">
            <ProductQuickView product={product} />
          </div>
        </div>

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-sm:static max-sm:translate-y-0 max-sm:p-2 max-sm:opacity-100">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 bg-[#087096] px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#06566f] sm:py-3.5 sm:text-xs"
          >
            <ShoppingBag size={16} />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-1.5 px-0.5 pt-3 sm:pt-4">
        {/* Category */}
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-[10px]">
          {category?.title || "Collection"}
        </p>

        {/* Title */}
        <Link
          href={`/product/${slug}`}
          className="group/title flex items-center justify-between gap-2"
        >
          <h3 className="line-clamp-1 text-sm font-medium capitalize text-[#222] transition-colors group-hover/title:text-[#087096] sm:text-base">
            {title}
          </h3>

          <ArrowUpRight
            size={15}
            className="shrink-0 text-gray-400 opacity-0 transition-all duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:opacity-100"
          />
        </Link>

        {/* Price */}
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          {price !== undefined && price !== null && (
            <span className="text-sm font-bold text-[#087096] sm:text-base">
              ৳{price}
            </span>
          )}

          {mrpPrice !== undefined &&
            mrpPrice !== null &&
            mrpPrice > (price ?? 0) && (
              <span className="text-xs text-gray-400 line-through sm:text-sm">
                ৳{mrpPrice}
              </span>
            )}

          {discount ? (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600">
              Save {discount}%
            </span>
          ) : null}
        </div>

        {/* Bottom Accent */}
        <div className="mt-1 h-[2px] w-0 bg-[#087096] transition-all duration-500 group-hover:w-10" />
      </div>
    </article>
  );
};

export default RowProductCard;
