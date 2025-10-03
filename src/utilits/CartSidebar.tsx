
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trash2, X } from "lucide-react";
import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";

import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { apiBaseUrl } from "../config/config";
import AddBtn from "./AddBtn";

interface SideCartbarProps {
  isSticky: boolean;
}

const SideCartbar = ({ isSticky }: SideCartbarProps) => {
   const cart = useCartStore((state) => state.cart);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [hydrated, setHydrated] = useState(false);

  // Wait until client is ready
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <p>Loading...</p>; // prevents SSR overwrite
  }


   const totalPrice = cart.reduce((acc, item) => {
    const price = Number(item.product?.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  console.log("cart client product",cart)

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <p className="flex relative">
          <span>
            <IoBagOutline size={20} />
          </span>
          <span
            className={`w-4 h-4 absolute top-[-4px] right-[-6px] text-[12px] flex items-center justify-center rounded-full ${
              isSticky ? "bg-primary text-white" : "bg-white text-[#262626]"
            }`}
          >
            {cart.length || 0}
          </span>
        </p>
      </SheetTrigger>
      <SheetContent className="">
        <div className="px-4 pt-4 relative">
          <h2 className="text-xl capitalize font-medium text-primary">
            Shopping cart ({cart.length})
          </h2>
        </div>

        {/* Show cart items from localStorage/API */}
        <div className="px-4 py-3 flex flex-col gap-2 overflow-y-scroll ">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="w-1/3 overflow-hidden">
                  <Image src={apiBaseUrl + item?.product?.thumbal_image} alt="" width={80} height={80} className="w-full"/>
                </div>

                <div className="w-full relative">
                  <div>
                    <p className="capitalize line-clamp-1 md:text-base text-sm">{item.product?.title}</p>
                  <p className="capitalize text-sm font-medium mt-1">TK. <span>{item.product?.price} * {item.quantity}</span></p>
                  </div>

                  <div className="absolute bottom-0 w-full">
                    <div className="flex justify-between items-center">
                    <AddBtn 
                    product={item?.product}
                  Quantity={item?.quantity}
                    addcartBtn={false} counterStyle="md:w-[16vh] w-[14vh] py-1"/>
                    <p 
                    onClick={() => removeFromCart(item._id || item.product?._id || item.product)}
                    className="p-2 bg-[red] text-white rounded cursor-pointer"><Trash2 size={16} /></p>
                  </div>
                  </div>
                </div>

               

                
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Your cart is empty</p>
          )}
        </div>

        <SheetFooter className="px-4 py-4">
          <div className="flex items-center justify-between font-semibold">
               <h2>Total Ammount</h2>
               <p>TK. {totalPrice}</p>
            </div>
          <div className="flex items-center gap-2">
            <SheetClose asChild>
              <Link href="/checkout" className="flex-1">
                <div className="bg-[#262626] text-white text-center capitalize py-3 cursor-pointer">
                  check out
                </div>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/cart" className="flex-1">
                <div className="border border-primary text-primary hover:bg-primary hover:text-white text-center capitalize py-3 cursor-pointer duration-300 transition-all">
                  view cart
                </div>
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>

        <SheetClose className="top-5 right-8 absolute ">
          <p className="cursor-pointer hover:rotate-45 duration-300">
            <X size={20} />
          </p>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SideCartbar;
