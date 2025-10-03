"use client"
import AddBtn from '@/src/utilits/AddBtn';
import ShippingInfo from '@/src/utilits/ShippingInfo';
import { Facebook, Instagram, LockKeyhole, ShieldCheck, Truck, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ColorOrSizeFunction from './ColorOrSizeFunction';
import payment from "@/src/assets/payment/payment.jpg";
import { TProducts } from '@/src/types';

interface productProps {
  product:TProducts
}

const ProductDetails:React.FC<productProps> = ({product}) => {

    const [selectedColor, setSelectedColor] = useState<string>("");
      const [selectedSize, setSelectedSize] = useState<string>("");
    return (
        <div className="">
            <div className="mt-4 px-2">
              <h1 className="md:text-2xl text-sm font-medium text-primary">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mt-2">
                {product.mrpPrice && (
                <p className="text-gray-500 line-through text-base">
                  ৳{product.mrpPrice}
                </p>
              )}
              <p className="text-lg ">৳{product.price}</p>

                {/* <p className="text-gray-500 line-through text-base">৳501</p>

                <p className="text-lg ">৳400</p> */}
              </div>

              <p className="mt-1 text-base text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-2 text-sm text-primary">
                <span className="font-semibold">SKU</span> : <span>{product.sku}</span>
              </p>
              <p className="mt-2 text-sm text-primary">
                <span className="font-semibold">Availability</span> : {product.stock_status}
              </p>

              {/* <div className="mt-2 text-sm text-primary">
                <p className="font-semibold">
                  Color : <span className="font-normal">Red</span>
                </p>

                <div className="flex items-center gap-2 mt-1 cursor-pointer">
                  <p className="w-7 h-7 rounded-full bg-blue-600 border border-primary/20"></p>
                  <p className="w-7 h-7 rounded-full bg-red-700 border border-primary/20"></p>
                  <p className="w-7 h-7 rounded-full bg-yellow-700 border border-primary/20"></p>
                  <p className="w-7 h-7 rounded-full bg-pink-700 border border-primary/20"></p>
                </div>
              </div> */}

              {/* <div className="mt-2 text-sm text-primary">
                <p className="font-semibold">
                  Size : <span className="font-normal">M</span>
                </p>
                <p className="flex items-center gap-1">
                  <span className="border border-[#262629]/40 px-2 rounded text-sm capitalize cursor-pointer hover:bg-primary hover:text-white duration-300">
                    s
                  </span>
                  <span className="border border-[#262629]/40 px-2 rounded text-sm capitalize cursor-pointer hover:bg-primary hover:text-white duration-300">
                    m
                  </span>
                  <span className="border border-[#262629]/40 px-2 rounded text-sm capitalize cursor-pointer hover:bg-primary hover:text-white duration-300">
                    l
                  </span>
                  <span className="border border-[#262629]/40 px-2 rounded text-sm capitalize cursor-pointer hover:bg-primary hover:text-white duration-300">
                    xl
                  </span>
                </p>
              </div> */}

              <ColorOrSizeFunction 
              colors={product.colors}
              selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}/>
              

              <AddBtn 
              selectedColor={selectedColor}
        selectedSize={selectedSize}
            product={product}
              
              
              counterMainStyle="mt-6" counterStyle="py-2 md:w-[45%] w-[30%]" />

              <Link href="/checkout" className="w-full">
                <div className="hover:bg-primary border border-primary duration-300 cursor-pointer text-primary  hover:text-white text-center py-2.5 mt-2">
                  <button className="text-base outline-none cursor-pointer">
                    Buy Now
                  </button>
                </div>
              </Link>
            </div>

            <div>
              <ShippingInfo />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="flex items-center gap-2 text-[#262629]/70">
                <span>
                  <LockKeyhole size={16} />
                </span>{" "}
                <span>Secure payment</span>
              </p>
              <p className="flex items-center gap-2 text-[#262629]/70">
                <span>
                  <ShieldCheck size={16} />
                </span>{" "}
                <span>2 Year Warranty</span>
              </p>
              <p className="flex items-center gap-2 text-[#262629]/70">
                <span>
                  <Truck size={16} />
                </span>{" "}
                <span>Spend $1,000.00 for Free Shipping</span>
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-[#262629]/60">
                Share with :{" "}
              </p>

              <div className="flex gap-2 mt-2">
                <p className="flex items-center gap-2 text-[#262629]/70">
                  <span className="bg-[#0866FF] p-1 rounded">
                    <Facebook size={16} fill="white" className="text-white" />
                  </span>{" "}
                </p>
                <p className="flex items-center gap-2 text-[#262629]/70">
                  <span className="bg-[#D64752] p-1 rounded">
                    <Instagram size={16} className="text-white" />
                  </span>{" "}
                </p>
                <p className="flex items-center gap-2 text-[#262629]/70">
                  <span className="bg-[#1C96E8] p-1 rounded text-white">
                    <Twitter size={16} />
                  </span>{" "}
                </p>
              </div>

              <div className="flex items-center flex-col justify-center border border-[#262629]/20 rounded mt-4">
                <h1 className="py-2 px-4 text-base font-medium mt-[-20px] bg-white">
                  Guarantee safe checkout
                </h1>
                <Image
                  src={payment}
                  alt="payment"
                  width={350}
                  height={350}
                  className="pb-4"
                />
              </div>
            </div>
          </div>
    );
};

export default ProductDetails;