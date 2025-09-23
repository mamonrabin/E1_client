// import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import ProductQuickView from "./ProductQuickView";
import Link from "next/link";
import { apiBaseUrl } from "@/src/config/config";
import { TProducts } from "@/src/types";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

interface cardProps {
  product:TProducts
}

const ProductCard:React.FC<cardProps> = ({ product }) => {
  const {
    title,
    price,
    mrpPrice,
    category,
    thumbal_image,
    backview_image,
    label,
    discount,
    slug
  } = product;
  return (
    <div className="group">
      <div className="relative  overflow-hidden">
        <Link href={`/product/${slug}`}>
          <Image
            src={apiBaseUrl + thumbal_image}
            alt="title"
            width={300}
            height={300}
            className="w-full h-full"
          />
        </Link>
        <Link href={`/product/${slug}`}>
          <Image
            className="top-0 absolute opacity-0 group-hover:opacity-100 hover:scale-105 duration-700 w-full h-full"
            src={apiBaseUrl + backview_image}
            alt="title"
            width={300}
            height={300}
          />
        </Link>
        <div className="group-hover:bottom-3 bottom-0 opacity-0 group-hover:opacity-100 absolute px-4 w-full duration-200 transition-all">
          <p className="bg-white hover:bg-primary hover:text-white w-full py-3 capitalize font-medium text-center cursor-pointer duration-700 transition-all">
            Add to cart
          </p>
        </div>

        <div className="top-5 group-hover:right-5 right-0 opacity-0 group-hover:opacity-100 duration-200 transition-all absolute flex flex-col gap-2">
          <p className="p-2 bg-white hover:bg-primary hover:text-white duration-300 cursor-pointer">
            <IoBagOutline size={18} />
          </p>

          <ProductQuickView product={product} />
        </div>

        <div className="top-3 left-3 absolute flex gap-2">
          {label && (
            <p className="px-2 py-1 bg-primary  duration-300 uppercase font-medium text-white md:inline-flex hidden sm:text-[12px] text-[10px]">
              {label}
            </p>
          )}
          {discount && (
            <p className="px-2 py-1 bg-primary uppercase font-medium text-white inline-flex text-[12px]">
              {discount}% off
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5 mt-3">
        <p className="text-[12px] uppercase font-medium tracking-wider text-gray-400">
          {category.title}
        </p>
        <Link href={`/product/${slug}`}>
          <h2 className="text-base capitalize line-clamp-1">{title}</h2>
        </Link>
        <div className="flex items-center gap-2">
          {mrpPrice && (
            <p className="text-gray-500 line-through">৳{mrpPrice}</p>
          )}
          {price &&
            (<p className="">৳{price}</p>)
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
