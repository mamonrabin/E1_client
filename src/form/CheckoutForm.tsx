
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Mail,
  Phone,
  UserRound,
  MapPin,
  Home,
  Map,
  MessageSquare,
  ShieldCheck,
  Tag,
  CheckCircle2,
  LoaderCircle,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import cash from "@/src/assets/payment/cash.png";
import bkash from "@/src/assets/payment/bkash.jpg";
import card from "@/src/assets/payment/card.png";

import { createOrder } from "../services/order";
import { useCartStore } from "../store/cartStore";
import { getCurrentUser } from "../utilits/CurrentUser";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  altNumber: string;
  houseNo: string;
  road: string;
  city: string;
  condition: string;
  paymentMethod: string;
}

interface CheckoutFormProps {
  cart: any[];
  districtList: string[];
  onCityChange: (city: string) => void;
  subTottalPrice: number;
  shippingCost: number;
  discount: number;
  totalCost: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const CheckoutForm = ({
  cart,
  districtList,
  onCityChange,
  subTottalPrice,
  shippingCost,
  totalCost,
}: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const clearCart = useCartStore((state) => state.setCart);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const router = useRouter();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser?.email) {
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (cart.length === 0) {
      Swal.fire(
        "Cart is empty",
        "Please add items before checkout",
        "warning",
      );
      return;
    }

    if (!currentUser) {
      Swal.fire({
        title: "Sign in required",
        text: "Please sign in to place your order",
        icon: "warning",
        confirmButtonText: "Sign In",
        confirmButtonColor: "#087096",
      }).then(() => {
        router.push("/signIn");
      });
      return;
    }

    setLoading(true);

    try {
      const order = {
        subTotalPrice: subTottalPrice,
        totalPrice: totalCost,
        shippingCost,
        userRef: currentUser._id,
        products: cart.map((item) => ({
          productRef: item.product._id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        })),
        ...data,
      };

      const res = await createOrder(order);

      if (res.error) {
        throw new Error(res.error);
      }

      await Swal.fire({
        title: "Order Placed Successfully!",
        text: "Thank you for shopping with us. Your order has been received.",
        icon: "success",
        confirmButtonText: "Continue Shopping",
        confirmButtonColor: "#087096",
      });

      clearCart([]);
      reset();
      router.push("/");
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        title: "Order Failed",
        text: error.message || "Failed to place your order. Please try again.",
        icon: "error",
        confirmButtonColor: "#087096",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

  const errorText = "mt-1.5 block text-xs text-red-500";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="w-full"
    >
      {/* Heading */}
      <motion.div variants={fadeUp} className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
            Almost There
          </span>
        </div>

        <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-gray-900">
          Checkout Information
          <ShoppingBag size={21} className="text-primary" />
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Complete your details below to place your order.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_5px_30px_rgba(0,0,0,0.035)] sm:p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          {/* Personal Information */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-0.5 text-xs text-gray-400">
                  Tell us how to contact you
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    {...register("name", {
                      required: "Your name is required",
                    })}
                    className={`${inputClass} pl-10`}
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>

                {errors.name && (
                  <span className={errorText}>{errors.name.message}</span>
                )}
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className={`${inputClass} pl-10`}
                      type="tel"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  {errors.phone && (
                    <span className={errorText}>{errors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      {...register("email")}
                      className={`${inputClass} pl-10 ${
                        currentUser?.email
                          ? "cursor-not-allowed bg-gray-100 text-gray-500"
                          : ""
                      }`}
                      type="email"
                      placeholder="Your email address"
                      readOnly={!!currentUser?.email}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Shipping Information */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TruckIcon />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Shipping Information
                </h3>
                <p className="mt-0.5 text-xs text-gray-400">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* House and Road */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    House / Flat No.
                  </label>
                  <div className="relative">
                    <Home
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      {...register("houseNo")}
                      className={`${inputClass} pl-10`}
                      type="text"
                      placeholder="House or flat number"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Road / Area
                  </label>
                  <div className="relative">
                    <Map
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      {...register("road")}
                      className={`${inputClass} pl-10`}
                      type="text"
                      placeholder="Road or area name"
                    />
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Detailed Address <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3.5 top-3.5 text-gray-400"
                  />
                  <textarea
                    {...register("address", {
                      required: "Delivery address is required",
                    })}
                    className={`${inputClass} min-h-[90px] resize-y pl-10`}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                  />
                </div>

                {errors.address && (
                  <span className={errorText}>{errors.address.message}</span>
                )}
              </div>

              {/* District and Alternative Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    District <span className="text-red-500">*</span>
                  </label>

                  <select
                    {...register("city", {
                      required: "Please select your district",
                      onChange: (e) => onCityChange(e.target.value),
                    })}
                    className={inputClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your district
                    </option>

                    {districtList.map((district) => (
                      <option
                        key={district}
                        value={district.toLowerCase()}
                      >
                        {district}
                      </option>
                    ))}
                  </select>

                  {errors.city && (
                    <span className={errorText}>{errors.city.message}</span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Alternative Phone
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      {...register("altNumber")}
                      className={`${inputClass} pl-10`}
                      type="tel"
                      placeholder="Alternative number"
                    />
                  </div>
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Order Note{" "}
                  <span className="font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <MessageSquare
                    size={17}
                    className="absolute left-3.5 top-3.5 text-gray-400"
                  />
                  <textarea
                    {...register("message")}
                    className={`${inputClass} min-h-[85px] resize-y pl-10`}
                    placeholder="Any special instructions for your delivery?"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Payment Method */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Payment Method
                </h3>
                <p className="mt-0.5 text-xs text-gray-400">
                  Choose how you want to pay
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "CashOnDelivery", image: cash, label: "Cash on Delivery" },
                { value: "bkash", image: bkash, label: "bKash" },
                { value: "card", image: card, label: "Card" },
              ].map((method) => (
                <label
                  key={method.value}
                  className="group relative cursor-pointer"
                >
                  <input
                    type="radio"
                    value={method.value}
                    {...register("paymentMethod", {
                      required: "Please select a payment method",
                    })}
                    className="peer sr-only"
                  />

                  <div className="flex h-[85px] flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02] peer-checked:border-primary peer-checked:bg-primary/[0.04] peer-checked:ring-2 peer-checked:ring-primary/10">
                    <Image
                      src={method.image}
                      alt={method.label}
                      width={100}
                      height={55}
                      className="max-h-10 w-full object-contain"
                    />

                    <span className="text-center text-[10px] font-medium text-gray-500 sm:text-xs">
                      {method.label}
                    </span>
                  </div>

                  <span className="absolute right-2 top-2 text-primary opacity-0 transition-opacity peer-checked:opacity-100">
                    <CheckCircle2 size={16} />
                  </span>
                </label>
              ))}
            </div>

            {errors.paymentMethod && (
              <span className={errorText}>
                {errors.paymentMethod.message}
              </span>
            )}
          </section>

          <div className="border-t border-gray-100" />

          {/* Coupon */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Tag size={17} className="text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">
                Have a Coupon Code?
              </h3>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className={`${inputClass} min-w-0 flex-1`}
                placeholder="Enter coupon code"
              />

              <button
                type="button"
                disabled={!couponCode.trim()}
                className="shrink-0 rounded-lg bg-primary px-5 text-xs font-semibold text-white transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                Apply
              </button>
            </div>

            <p className="mt-2 text-[11px] text-gray-400">
              Coupon discounts will be applied according to the offer terms.
            </p>
          </section>

          {/* Terms and Conditions */}
          <section>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-3.5 transition-colors hover:bg-gray-100/80">
              <input
                {...register("condition", {
                  required: "You must agree before placing your order",
                })}
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
              />

              <span className="text-xs leading-6 text-gray-600">
                I agree to the{" "}
                <Link
                  href="/terms-conditions"
                  className="font-semibold text-primary hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <AnimatePresence>
              {errors.condition && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-xs text-red-500"
                >
                  {errors.condition.message}
                </motion.p>
              )}
            </AnimatePresence>
          </section>

          {/* Order Submit */}
          <motion.div
            whileHover={!loading ? { y: -2 } : undefined}
            whileTap={!loading ? { scale: 0.99 } : undefined}
            className="pt-1"
          >
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/15 transition-all duration-300 hover:bg-secondary hover:shadow-xl hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Processing Your Order...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Confirm Your Order
                </>
              )}
            </button>
          </motion.div>

          {/* Secure Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            Your personal information is handled securely.
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17h4V5H2v12h3" />
    <path d="M14 9h4l4 4v4h-3" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="16.5" cy="17.5" r="2.5" />
  </svg>
);

export default CheckoutForm;
