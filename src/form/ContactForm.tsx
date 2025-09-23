"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setLoading(true);

    console.log("Form Data:", data);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Message Confirmed!",
        text: "Your message has been placed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });

      reset();
    }, 2000);
  };
  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register("name", { required: true })}
            className="px-4 py-2 border rounded outline-none w-full"
            type="text"
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-sm text-red-500">name is required</span>
          )}
        </div>
        <div>
          <input
            {...register("email", { required: true })}
            className="px-4 py-2 border rounded outline-none w-full"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-sm text-red-500">email is required</span>
          )}
        </div>
        <div>
          <input
            {...register("phone", { required: true })}
            className="px-2 py-2 border rounded outline-none w-full"
            type="tel"
            placeholder="Phone"
          />
          {errors.phone && (
            <span className="text-sm text-red-500">phone is required</span>
          )}
        </div>

        <div>
          <textarea
            {...register("message", { required: true })}
            className="px-2 py-2 border rounded outline-none w-full"
            placeholder="Your messages"
            cols={30}
            rows={6}
          ></textarea>
          {errors.message && (
            <span className="text-sm text-red-500">message is required</span>
          )}
        </div>

        <div className="">
          <button
            type="submit"
            disabled={loading}
            className="px-2 py-2 border bg-primary hover:bg-secondary duration-300 rounded outline-none w-full text-[#fff] cursor-pointer"
          >
            {loading && <span className="animate-spin  rounded-full"></span>}
            {loading ? "Processing..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
