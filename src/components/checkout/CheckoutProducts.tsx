import { apiBaseUrl } from "@/src/config/config";
import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutProducts = ({ cart,subTottalPrice,shippingCost,totalCost,discount }) => {
   
   


  return (
    <div className="border border-primary/20 rounded p-4  lg:mt-10 sticky lg:top-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-primary">Cart Overview</h2>
        <Link href="/cart">
          <p className="flex items-center gap-1 font-medium text-sm cursor-pointer hover:text-primary duration-300">
            <span>
              <FilePenLine size={16} />
            </span>
            <span>Modify cart</span>
          </p>
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-b border-primary/20 pb-4 ">
        {cart.map((cat) => (
          <div key={cat.id} className="flex justify-between">
            <div className="flex gap-4">
              <div className="w-[100px] h-[80px] border">
                <Image
                  src={apiBaseUrl + cat?.product?.thumbal_image}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
              <div className="w-full">
                <p className="text-sm line-clamp-1">{cat?.product?.title}</p>
                <p className="text-sm capitalize">
                  <span>size : </span> <span>{cat.size || "N/A"}</span>
                </p>
                <p className="text-sm font-medium text-primary capitalize">
                  <span>price : </span>{" "}
                  <span>
                    {cat?.product?.price} X {cat.quantity}
                  </span>
                </p>
              </div>
            </div>

            <div className="w-[25px] h-[25px] border border-primary/20 rounded text-primary hover:bg-[red] hover:text-white duration-300 cursor-pointer flex items-center justify-center">
              <Trash size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 py-2 border-b border-primary/20">
        <p className="flex items-center justify-between font-medium">
          <span className="text-sm">SubTotal : </span>{" "}
          <span className="text-base text-primary">৳ {subTottalPrice}</span>
        </p>
        <p className="flex items-center justify-between font-medium">
          <span className="text-sm">Shipping (+): </span>{" "}
          <span className="text-base text-primary">৳ {shippingCost}</span>
        </p>
        <p className="flex items-center justify-between font-medium">
          <span className="text-sm">Discount (-): </span>{" "}
          <span className="text-base text-primary">৳ {discount}</span>
        </p>
      </div>

      <div className="mt-2">
        <p className="flex items-center justify-between font-medium">
          <span>Total Cost : </span>{" "}
          <span className="text-lg text-primary">৳ {totalCost}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutProducts;
