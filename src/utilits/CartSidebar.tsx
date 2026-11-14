
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Trash2, ShoppingBag, ArrowRight, X } from "lucide-react";
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

const formatPrice = (price: number) =>
  `৳${price.toLocaleString("en-BD")}`;

const SideCartbar = ({ isSticky }: SideCartbarProps) => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="relative flex h-9 w-9 items-center justify-center">
        <IoBagOutline size={21} />
      </div>
    );
  }

  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce((acc, item) => {
    const price = Number(item.product?.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <Sheet>
      {/* Cart Trigger */}
      <SheetTrigger
        aria-label={`Shopping cart with ${totalQuantity} items`}
        className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5"
      >
        <IoBagOutline
          size={23}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        {totalQuantity > 0 && (
          <span
            className={`absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
              isSticky
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
          >
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 border-l border-black/5 bg-white p-0 sm:max-w-[430px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Shopping Bag
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your bag
            </p>
          </div>

          <SheetClose
            aria-label="Close shopping cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:rotate-90 hover:bg-gray-200"
          >
            <X size={17} />
          </SheetClose>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length > 0 ? (
            <div className="flex flex-col gap-5">
              {cart.map((item) => {
                const product = item.product;
                const price = Number(product?.price) || 0;

                return (
                  <div
                    key={item._id || product?._id}
                    className="group flex gap-4 border-b border-gray-100 pb-5"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] w-[105px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                      {product?.thumbal_image && (
                        <Image
                          src={apiBaseUrl + product.thumbal_image}
                          alt={product?.title || "Product"}
                          fill
                          sizes="105px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900">
                          {product?.title}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-gray-900">
                          {formatPrice(price)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Subtotal: {formatPrice(price * item.quantity)}
                        </p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <AddBtn
                          product={product}
                          Quantity={item.quantity}
                          addcartBtn={false}
                          counterStyle="w-[105px] py-1"
                        />

                        <button
                          type="button"
                          aria-label={`Remove ${product?.title} from cart`}
                          onClick={() =>
                            removeFromCart(
                              item._id || product?._id || product
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty Cart */
            <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                <ShoppingBag
                  size={32}
                  strokeWidth={1.2}
                  className="text-gray-400"
                />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                Your bag is empty
              </h3>

              <p className="mt-2 max-w-[230px] text-sm leading-6 text-gray-500">
                Looks like you havent added anything to your bag yet.
                Explore our collection and find something you love.
              </p>

              <SheetClose asChild>
                <Link
                  href="/shop"
                  className="mt-7 inline-flex items-center gap-3 bg-black px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary"
                >
                  Start Shopping
                  <ArrowRight size={15} />
                </Link>
              </SheetClose>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        {cart.length > 0 && (
          <div className="mt-auto border-t border-gray-100 bg-white px-6 pb-6 pt-5">
            {/* Price Summary */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Subtotal
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  Shipping calculated at checkout
                </p>
              </div>

              <p className="text-lg font-semibold text-gray-900">
                {formatPrice(totalPrice)}
              </p>
            </div>

            {/* Checkout */}
            <SheetClose asChild>
              <Link
                href="/checkout"
                className="mt-5 flex w-full items-center justify-center gap-3 bg-black py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-primary"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
            </SheetClose>

            {/* View Cart */}
            <SheetClose asChild>
              <Link
                href="/cart"
                className="mt-3 flex w-full items-center justify-center border border-gray-200 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-800 transition-all duration-300 hover:border-black hover:bg-gray-50"
              >
                View Shopping Bag
              </Link>
            </SheetClose>

            <p className="mt-4 text-center text-[10px] tracking-wide text-gray-400">
              Secure checkout · Easy shopping · Quality products
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SideCartbar;
