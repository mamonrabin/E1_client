"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createContact } from "../services/contact";


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

    try {
      const res = await createContact(data);

      if (res?.error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Message Confirmed!",
          text: "Your message has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/");
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Unable to send message. Try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
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
            <span className="text-sm text-red-500">Name is required</span>
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
            <span className="text-sm text-red-500">Email is required</span>
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
            <span className="text-sm text-red-500">Phone is required</span>
          )}
        </div>

        <div>
          <textarea
            {...register("message", { required: true })}
            className="px-2 py-2 border rounded outline-none w-full"
            placeholder="Your message"
            cols={30}
            rows={6}
          ></textarea>
          {errors.message && (
            <span className="text-sm text-red-500">Message is required</span>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-2 py-2 border bg-primary hover:bg-secondary duration-300 rounded outline-none w-full text-[#fff] cursor-pointer"
          >
            {loading ? "Processing..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
