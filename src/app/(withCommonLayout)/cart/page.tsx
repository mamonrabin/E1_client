
"use client";

import { useCartStore } from "@/src/store/cartStore";
import AddBtn from "@/src/utilits/AddBtn";
import PageSection from "@/src/utilits/PageSection";
import { apiBaseUrl } from "@/src/config/config";
import {
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  PackageCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce((acc, item) => {
    const price = Number(item.product?.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  const formatPrice = (price: number) =>
    price.toLocaleString("en-BD");

  const getImageUrl = (image?: string) => {
    if (!image) return "/placeholder.png";

    return image.startsWith("http")
      ? image
      : `${apiBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  const handleRemove = (item: (typeof cart)[number]) => {
    removeFromCart(
      item._id || item.product?._id || item.product
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <PageSection second="My Cart" />

      <div className="Container mx-auto mt-8 w-full px-4 pb-16 sm:px-6 lg:mt-12 xl:px-20">
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Your Selection
          </span>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Shopping Bag
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your selected pieces before checkout.
          </p>

          <div className="mt-5 h-[2px] w-12 bg-primary" />
        </motion.div>

        {cart.length > 0 ? (
          <>
            {/* Desktop Cart */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="grid grid-cols-12 bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Subtotal</div>
                  <div className="col-span-1 text-center">Remove</div>
                </div>

                <div className="divide-y divide-gray-100">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item, index) => (
                      <motion.div
                        key={
                          item._id ||
                          `${item.product?._id}-${item.color}-${item.size}-${index}`
                        }
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-12 items-center px-6 py-5"
                      >
                        <div className="col-span-5 flex items-center gap-4">
                          <Link
                            href={`/product/${item.product?.slug}`}
                            className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                          >
                            <Image
                              src={getImageUrl(item.product?.thumbal_image)}
                              alt={item.product?.title || "Product"}
                              fill
                              sizes="80px"
                              className="object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </Link>

                          <div className="min-w-0">
                            <Link
                              href={`/product/${item.product?.slug}`}
                              className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary"
                            >
                              {item.product?.title}
                            </Link>

                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                              <span>Size: {item.size || "N/A"}</span>
                              {item.color && (
                                <span>Color: {item.color}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 text-sm font-medium text-gray-700">
                          ৳ {formatPrice(Number(item.product?.price) || 0)}
                        </div>

                        <div className="col-span-2">
                          <AddBtn
                            product={item.product}
                            Quantity={item.quantity}
                            addcartBtn={false}
                            counterStyle="w-[115px] py-2"
                          />
                        </div>

                        <div className="col-span-2 text-sm font-semibold text-primary">
                          ৳{" "}
                          {formatPrice(
                            (Number(item.product?.price) || 0) *
                              item.quantity
                          )}
                        </div>

                        <div className="col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemove(item)}
                            aria-label="Remove product"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile Cart */}
            <div className="space-y-4 lg:hidden">
              <AnimatePresence mode="popLayout">
                {cart.map((item, index) => (
                  <motion.div
                    key={
                      item._id ||
                      `${item.product?._id}-${item.color}-${item.size}-${index}`
                    }
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="flex gap-4 p-4">
                      <Link
                        href={`/product/${item.product?.slug}`}
                        className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                      >
                        <Image
                          src={getImageUrl(item.product?.thumbal_image)}
                          alt={item.product?.title || "Product"}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product?.slug}`}
                            className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900"
                          >
                            {item.product?.title}
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleRemove(item)}
                            aria-label="Remove product"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>Size: {item.size || "N/A"}</span>
                          {item.color && <span>Color: {item.color}</span>}
                        </div>

                        <div className="mt-auto pt-3">
                          <p className="text-sm font-semibold text-primary">
                            ৳ {formatPrice(Number(item.product?.price) || 0)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-4 py-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Quantity
                        </p>
                        <div className="mt-1">
                          <AddBtn
                            product={item.product}
                            Quantity={item.quantity}
                            addcartBtn={false}
                            counterStyle="w-[110px] py-1.5"
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Subtotal
                        </p>
                        <p className="mt-1 text-base font-bold text-gray-900">
                          ৳{" "}
                          {formatPrice(
                            (Number(item.product?.price) || 0) *
                              item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                >
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>

                <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={19} className="text-primary" />
                    <span className="text-[11px] text-gray-500">
                      Secure Checkout
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Truck size={19} className="text-primary" />
                    <span className="text-[11px] text-gray-500">
                      Reliable Delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <PackageCheck size={19} className="text-primary" />
                    <span className="text-[11px] text-gray-500">
                      Quality Products
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Total Items
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {cart.reduce(
                      (total, item) => total + Number(item.quantity || 0),
                      0
                    )}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ৳ {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="my-5 border-t border-dashed border-gray-300" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0.5, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold tracking-tight text-primary"
                  >
                    ৳ {formatPrice(totalPrice)}
                  </motion.span>
                </div>

                <Link
                  href="/checkout"
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary hover:shadow-lg hover:shadow-primary/20"
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-3 text-center text-[11px] text-gray-400">
                  Shipping charges calculated at checkout.
                </p>
              </motion.div>
            </div>
          </>
        ) : (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-gray-100 px-6 py-16 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/5">
              <ShoppingBag size={38} className="text-primary" strokeWidth={1.3} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              Your bag is waiting
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              You havent added anything to your shopping bag yet. Explore
              our collection and find something you love.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-secondary"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Page;
