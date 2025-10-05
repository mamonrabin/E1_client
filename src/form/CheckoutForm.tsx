/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Phone, UserRound } from "lucide-react";
import React, { useState, useEffect } from "react";
import cash from "@/src/assets/payment/cash.png";
import bkash from "@/src/assets/payment/bkash.jpg";
import card from "@/src/assets/payment/card.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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
  const router = useRouter();
  const currentUser = getCurrentUser();

  // Auto-fill email if logged in
  useEffect(() => {
    if (currentUser?.email) {
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (cart.length === 0) {
      Swal.fire("Cart is empty", "Please add items before checkout", "warning");
      return;
    }

    // Check login
    if (!currentUser) {
      Swal.fire({
        title: "Sign in required",
        text: "Please sign in to place your order",
        icon: "warning",
        confirmButtonText: "Sign In",
      }).then(() => {
        router.push("/signIn"); // Change this to your login page route
      });
      return;
    }

    setLoading(true);

    try {
      // Build order payload
      const order = {
        subTotalPrice: subTottalPrice,
        totalPrice: totalCost,
        shippingCost,
        userRef: currentUser._id, // optional if backend requires
        products: cart.map((item) => ({
          productRef: item.product._id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        })),
        ...data,
      };

      const res = await createOrder(order);

      if (res.error) throw new Error(res.error);

      Swal.fire("Success", "Your order has been placed!", "success").then(() => {
        clearCart([]);
        router.push("/"); // redirect to home
      });

      reset();
    } catch (error: any) {
      console.error(error);
      Swal.fire("Error", error.message || "Failed to place order", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-center text-xl font-medium">Checkout Info</h2>

      <div className="border border-primary/20 rounded p-4 mt-4">
        <h2 className="font-medium text-sm text-primary">Personal Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col gap-2">
          <div>
            <div className="flex items-center gap-2 border border-primary/20 rounded">
              <p className="bg-primary text-white px-3 py-2.5 rounded">
                <UserRound size={16} />
              </p>
              <input
                {...register("name", { required: true })}
                className="outline-none text-sm w-full"
                type="text"
                placeholder="Name..."
              />
            </div>
            {errors.name && <span className="text-sm text-red-500">name is required</span>}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-full">
              <div className="flex items-center gap-2 border border-primary/20 rounded w-full">
                <p className="bg-primary text-white px-3 py-2.5 rounded">
                  <Phone size={16} />
                </p>
                <input
                  {...register("phone", { required: true })}
                  className="outline-none text-sm w-full"
                  type="text"
                  placeholder="Phone Number..."
                />
              </div>
              {errors.phone && (
                <span className="text-sm text-red-500">phone is required</span>
              )}
            </div>

            <div className="flex items-center gap-2 border border-primary/20 rounded w-full">
              <p className="bg-primary text-white px-3 py-2.5 rounded">
                <Mail size={16} />
              </p>
              <input
                {...register("email")}
                className="outline-none text-sm w-full"
                type="text"
                placeholder="Email (If you have)"
                disabled={!!currentUser?.email} // lock if logged in
              />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-medium text-sm text-primary">Shipping Information</h2>

            <div className="flex gap-2 mt-2">
              <input
                {...register("houseNo")}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
                type="text"
                placeholder="House No..."
              />
              <input
                {...register("road")}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
                type="text"
                placeholder="Road/Area..."
              />
            </div>

            <div className="mt-2">
              <input
                {...register("address", { required: true })}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
                type="text"
                placeholder="Details Address.."
              />
              {errors.address && (
                <span className="text-xs text-red-500">Address is required</span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <select
                {...register("city", { required: true })}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
                onChange={(e) => onCityChange(e.target.value)}
              >
                <option value="">Select District</option>
                {districtList.map((district) => (
                  <option key={district} value={district.toLowerCase()}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.city && (
                <span className="text-xs text-red-500">Please select a city</span>
              )}

              <input
                {...register("altNumber")}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
                type="text"
                placeholder="Alt. Number..."
              />
            </div>

            <div className="mt-2">
              <textarea
                {...register("message")}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
                placeholder="Special Note(Optional)..."
                cols={30}
                rows={6}
              ></textarea>
            </div>
          </div>

          <div>
            <h2 className="font-medium text-sm text-primary">Payment Method</h2>

            <div className="flex items-center gap-2 mt-2">
              <label className="md:w-[120px] w-[100px] h-[60px] cursor-pointer">
                <input
                  type="radio"
                  value="CashOnDelivery"
                  {...register("paymentMethod", { required: true })}
                  className="hidden peer"
                />
                <div className="border border-primary/40 peer-checked:border-primary hover:border-primary duration-300 p-4 rounded w-full h-full flex items-center justify-center">
                  <Image src={cash} alt="CashOnDelivery" width={100} height={100} />
                </div>
              </label>

              <label className="md:w-[120px] w-[100px] h-[60px] cursor-pointer">
                <input
                  type="radio"
                  value="bkash"
                  {...register("paymentMethod", { required: true })}
                  className="hidden peer"
                />
                <div className="border border-primary/40 peer-checked:border-primary hover:border-primary duration-300 p-4 rounded w-full h-full flex items-center justify-center">
                  <Image src={bkash} alt="Bkash" width={100} height={100} />
                </div>
              </label>

              <label className="md:w-[120px] w-[100px] h-[60px] cursor-pointer">
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod", { required: true })}
                  className="hidden peer"
                />
                <div className="border border-primary/40 peer-checked:border-primary hover:border-primary duration-300 p-4 rounded w-full h-full flex items-center justify-center">
                  <Image src={card} alt="Card" width={100} height={100} />
                </div>
              </label>
            </div>

            {errors.paymentMethod && (
              <span className="text-xs text-red-500">Please select a payment method</span>
            )}
          </div>

          <div className="mt-2">
            <h2 className="font-medium text-sm text-primary">Got any Coupon Code?</h2>

            <div className="mt-2 flex items-end gap-2 w-full">
              <input
                className="px-2 py-2 rounded border border-primary/20 text-sm w-3/4 outline-none"
                type="text"
                placeholder="Enter coupon here..."
              />
              <button
                type="button"
                className="xl:text-sm sm:text-[12px] text-[10px] xl:px-4 px-2 xl:py-2 sm:py-2.5 py-3 rounded hover:bg-secondary duration-300 cursor-pointer font-medium bg-primary text-white"
              >
                Add Coupon
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                {...register("condition", { required: true })}
                type="checkbox"
                id="condition"
              />
              <label htmlFor="condition" className="md:text-sm text-[12px]">
                I agree to{" "}
                <span className="text-primary hover:underline duration-300 cursor-pointer">
                  Terms & Conditions
                </span>
                , and{" "}
                <span className="text-primary hover:underline duration-300 cursor-pointer">
                  Privacy Policy
                </span>{" "}
                of mixtax.
              </label>
            </div>
            {errors.condition && (
              <span className="text-xs text-red-500 ml-5">Check the box</span>
            )}
          </div>

          <div className="py-4">
            <button
              type="submit"
              disabled={loading}
              className="px-2 py-2 font-medium hover:bg-secondary duration-300 cursor-pointer rounded bg-primary text-sm w-full text-white outline-none flex justify-center items-center gap-2"
            >
              {loading && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              )}
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
