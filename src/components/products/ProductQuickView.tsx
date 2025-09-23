
"use client";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Clock4, Search, Truck } from "lucide-react";
import Link from "next/link";

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

  // Group colors by colorName
  // const groupedColors: Record<
  //   string,
  //   { colorCode: string; sizes: { _id: string; title: string }[] }
  // > = {};

  // colors?.forEach((c) => {
  //   if (!groupedColors[c.colorName]) {
  //     groupedColors[c.colorName] = { colorCode: c.colorCode, sizes: [] };
  //   }
  //   groupedColors[c.colorName].sizes.push(c.size);
  // });

  // const colorNames = Object.keys(groupedColors);
  // const [selectedColor, setSelectedColor] = useState<string>(colorNames[0]);

  // Track selected size
  // const [selectedSize, setSelectedSize] = useState<string>(
  //   groupedColors[selectedColor]?.sizes[0]?._id || ""
  // );

 
  // useEffect(() => {
  //   if (groupedColors[selectedColor]?.sizes?.length > 0) {
  //     setSelectedSize(groupedColors[selectedColor].sizes[0]._id);
  //   }
  // }, [selectedColor]);

  return (
    <Dialog>
      <DialogTrigger>
        <p className="p-2 bg-white hover:bg-primary hover:text-white duration-300 cursor-pointer">
          <Search size={18} />
        </p>
      </DialogTrigger>
      <DialogContent className="lg:max-w-5xl h-[500px] rounded-none p-0 overflow-y-scroll">
        <div className="grid lg:grid-cols-2 rounded-none gap-4">
          {/* Left Side: Image */}
          <div>
            <Image
              src={apiBaseUrl + thumbal_image}
              alt="product image"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>

          {/* Right Side: Details */}
          <div className="mt-4 px-2">
            <h1 className="md:text-2xl text-sm font-medium text-primary">
              {title}
            </h1>

            <div className="flex items-center gap-3 mt-2">
              {mrpPrice && (
                <p className="text-gray-500 line-through text-base">
                  ৳{mrpPrice}
                </p>
              )}
              {price && <p className="">৳{price}</p>}
            </div>

            <p className="mt-1 text-base text-gray-500 line-clamp-2">
              {description}
            </p>

            <p className="mt-2 text-sm text-primary">
              <span className="font-semibold">SKU</span> : {sku || "N/A"}
            </p>
            <p className="mt-2 text-sm text-primary">
              <span className="font-semibold">Availability</span> :{" "}
              <span className="uppercase">{stock_status || "N/A"}</span>
            </p>

            {/* Colors */}
            <ColorOrSizeFunction colors={colors}/>

            <AddBtn counterMainStyle="mt-6" />

            <Link href="/checkout" className="w-full">
              <div className="hover:bg-primary border border-primary duration-300 cursor-pointer text-primary hover:text-white text-center py-2.5 mt-2">
                <button className="text-base outline-none cursor-pointer">
                  Buy Now
                </button>
              </div>
            </Link>

            {/* Shipping Info */}
            <div className="mt-4 flex flex-col gap-3">
              <p className="flex items-center gap-2">
                <span className="text-gray-500">
                  <Truck size={25} />
                </span>
                <span className="text-gray-500">
                  Free worldwide shipping on all orders over $100
                </span>
              </p>
              <div className="flex items-center gap-2">
                <p className="text-gray-500">
                  <Clock4 size={25} />
                </p>
                <p className="text-gray-500">
                  <span>Delivers in: 3-7 Working Days</span>{" "}
                  <span className="underline text-primary hover:text-secondary duration-500 font-medium cursor-pointer">
                    Shipping & Return
                  </span>
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="flex items-center justify-center py-8 flex-col">
              <Image src={payment} alt="payment" width={300} height={200} />
              <p className="mt-3 text-sm capitalize text-gray-500 tracking-wider">
                Guaranteed Checkout
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
