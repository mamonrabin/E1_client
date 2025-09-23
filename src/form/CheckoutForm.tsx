"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Phone, UserRound } from "lucide-react";
import React, { useState } from "react";
import cash from "@/src/assets/payment/cash.png";
import bkash from "@/src/assets/payment/bkash.jpg";
import card from "@/src/assets/payment/card.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { districtList } from "../utilits/allDistict";

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

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    setLoading(true);

    console.log("Form Data:", data);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Order Confirmed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });

      reset();
    }, 2000);
  };
  return (
    <div className="">
      <h2 className="text-center text-xl font-medium">Checkout Info</h2>

      <div className="border border-primary/20 rounded p-4 mt-4">
        <h2 className="font-medium text-sm text-primary">
          Personal Information
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-col gap-2"
        >
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
            {errors.name && (
              <span className="text-sm text-red-500">name is required</span>
            )}
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
                className="outline-none text-sm w-full"
                type="text"
                placeholder="Email (If you have)"
              />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-medium text-sm text-primary">
              Shipping Information
            </h2>

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
            </div>

            <div className="mt-2 flex items-center gap-2">
              <select
                {...register("city", { required: true })}
                className="px-2 py-2 rounded border border-primary/20 text-sm w-full outline-none"
              >
                <option value="">Select District</option>
                {districtList.map((district) => (
                  <option key={district} value={district.toLowerCase()}>
                    {district}
                  </option>
                ))}
              </select>

              {errors.city && (
                <span className="text-xs text-red-500">
                  Please select a city
                </span>
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
              <label className="w-[120px] h-[60px] cursor-pointer">
                <input
                  type="radio"
                  value="cash"
                  {...register("paymentMethod", { required: true })}
                  className="hidden peer"
                />
                <div className="border border-primary/40 peer-checked:border-primary hover:border-primary duration-300 p-4 rounded w-full h-full flex items-center justify-center">
                  <Image src={cash} alt="Cash" width={100} height={100} />
                </div>
              </label>

              <label className="w-[120px] h-[60px] cursor-pointer">
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

              <label className="w-[120px] h-[60px] cursor-pointer">
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
              <span className="text-xs text-red-500">
                Please select a payment method
              </span>
            )}
          </div>

          <div className="mt-2">
            <h2 className="font-medium text-sm text-primary">
              Got any Coupon Code?
            </h2>

            <div className="mt-2 flex items-end gap-2 w-full">
              <input
                className="px-2 py-2 rounded border border-primary/20 text-sm w-3/4 outline-none"
                type="text"
                placeholder="Enter coupon here..."
              />
              <button className="xl:text-sm sm:text-[12px] text-[10px] xl:px-4 px-2 xl:py-2 sm:py-2.5 py-3 rounded hover:bg-secondary duration-300 cursor-pointer font-medium bg-primary text-white">
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
