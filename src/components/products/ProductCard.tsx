"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowUpRight, Sparkles, Heart } from "lucide-react";
import toast from "react-hot-toast";

import { apiBaseUrl } from "@/src/config/config";
import { TProducts } from "@/src/types";
import { useCartStore } from "@/src/store/cartStore";
import ProductQuickView from "./ProductQuickView";

interface CardProps {
  product: TProducts;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
  const {
    title,
    price,
    mrpPrice,
    category,
    thumbal_image,
    backview_image,
    labels,
    discount,
    slug,
  } = product;

  const addToCart = useCartStore((state) => state.addToCart);

  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleAddToCart = () => {
    addToCart({ product, quantity: 1 });
    toast.success(`${title} added to cart!`, {
      duration: 1500,
      position: "top-right",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted((v) => !v);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      { duration: 1200, position: "top-right" }
    );
  };

  const productUrl = `/product/${slug}`;
  const hasDiscount = Number(discount) > 0;
  const hasTrending = labels === "Trending";
  const hasSecondImage = Boolean(backview_image);
  const hasMrp = Number(mrpPrice) > Number(price);

  const formatPrice = (value: number | string) =>
    Number(value).toLocaleString("en-BD");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-w-0"
    >
      {/* === Product Visual === */}
      <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#f6f5f2] to-[#ecebe6] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 group-hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
        <Link
          href={productUrl}
          aria-label={`View ${title}`}
          className="relative block aspect-[3/4] overflow-hidden"
        >
          {/* Main image */}
          <Image
            src={apiBaseUrl + thumbal_image}
            alt={title}
            fill
            sizes="(max-width: 480px) 65vw, (max-width: 768px) 45vw, (max-width: 1200px) 25vw, 300px"
            className={`object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasSecondImage
                ? "group-hover:scale-110 group-hover:opacity-0"
                : "group-hover:scale-110"
            }`}
          />

          {/* Alternate image */}
          {backview_image && (
            <Image
              src={apiBaseUrl + backview_image}
              alt={`${title} alternate view`}
              fill
              sizes="(max-width: 480px) 65vw, (max-width: 768px) 45vw, (max-width: 1200px) 25vw, 300px"
              className="scale-110 object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          )}

          {/* Soft top light overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Bottom gradient for contrast */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-60" />
        </Link>

        {/* === Top badges === */}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2 sm:left-4 sm:top-4">
          {hasDiscount && (
            <span className="relative overflow-hidden rounded-full bg-gradient-to-r from-black to-gray-800 px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] text-white shadow-lg shadow-black/20 sm:text-[10px]">
              <span className="relative z-10">{discount}% OFF</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </span>
          )}

          {hasTrending && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-gray-900 shadow-sm backdrop-blur-md sm:text-[10px]">
              <Sparkles size={11} className="text-amber-500" />
              Trending
            </span>
          )}
        </div>

        {/* === Right action column === */}
        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 sm:right-4 sm:top-4">
          {/* Wishlist */}
          <motion.button
            type="button"
            onClick={handleWishlist}
            whileTap={{ scale: 0.88 }}
            aria-label="Add to wishlist"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white sm:h-10 sm:w-10"
          >
            <Heart
              size={16}
              className={`transition-all duration-300 ${
                isWishlisted
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-700"
              }`}
            />
          </motion.button>

          {/* Quick view */}
          <div className="">
            <ProductQuickView product={product} />
          </div>
        </div>

        {/* === Add to cart bar === */}
       

<div className="absolute inset-x-0 bottom-0 z-10 p-3">
  <button
    type="button"
    onClick={handleAddToCart}
    className="group/btn relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
  >
    {/* Animated background */}
    <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />

    {/* Text */}
    <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-300 group-hover/btn:text-white">
      <ShoppingBag size={15} />
      Add to bag
    </span>

    {/* Arrow */}
    <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:rotate-45 group-hover/btn:bg-white/20 group-hover/btn:text-white">
      <ArrowUpRight size={15} />
    </span>
  </button>
</div>


      </div>

      {/* === Product Details === */}
      <div className="px-0.5 pt-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <p className="truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-[10px]">
            {category?.title || "Collection"}
          </p>

          {hasDiscount && (
            <span className="shrink-0 text-[9px] font-medium uppercase tracking-wider text-primary">
              Special Price
            </span>
          )}
        </div>

        <Link href={productUrl} className="block">
          <h3 className="line-clamp-1 text-[13px] font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-primary sm:text-[15px]">
            {title}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {price != null && (
            <span className="text-[15px] font-extrabold tracking-tight text-gray-950 sm:text-base">
              ৳{formatPrice(price)}
            </span>
          )}

          {hasMrp && (
            <span className="text-[11px] font-medium text-gray-400 line-through sm:text-xs">
              ৳{formatPrice(mrpPrice)}
            </span>
          )}

         
        </div>

        {/* Animated accent line */}
        <div className="mt-3 h-px w-full overflow-hidden bg-gray-100">
          <div className="h-full w-0 bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;