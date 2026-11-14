
"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createContact } from "../services/contact";
import {
  UserRound,
  Mail,
  Phone,
  MessageSquare,
  Send,
  LoaderCircle,
} from "lucide-react";

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
        await Swal.fire({
          title: "Message Not Sent",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#087096",
        });
      } else {
        reset();

        await Swal.fire({
          title: "Thank You!",
          text: "Your message has been sent successfully. Our team will get back to you soon.",
          icon: "success",
          confirmButtonText: "Continue Shopping",
          confirmButtonColor: "#087096",
        });

        router.push("/");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      await Swal.fire({
        title: "Something Went Wrong",
        text: "Unable to send your message right now. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#087096",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-[#202020] outline-none transition duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#087096] focus:ring-4 focus:ring-[#087096]/10";

  const labelStyle =
    "mb-2 block text-sm font-medium text-[#333333]";

  const errorStyle = "mt-1.5 block text-xs text-red-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelStyle}>
          Your Name <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <UserRound
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Please enter your name",
              minLength: {
                value: 2,
                message: "Name must contain at least 2 characters",
              },
            })}
            aria-invalid={!!errors.name}
            className={`${inputStyle} ${
              errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
            }`}
          />
        </div>

        {errors.name && (
          <span className={errorStyle}>{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelStyle}>
          Email Address <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            aria-invalid={!!errors.email}
            className={`${inputStyle} ${
              errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
            }`}
          />
        </div>

        {errors.email && (
          <span className={errorStyle}>{errors.email.message}</span>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelStyle}>
          Phone Number <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Phone
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            {...register("phone", {
              required: "Please enter your phone number",
              minLength: {
                value: 7,
                message: "Please enter a valid phone number",
              },
            })}
            aria-invalid={!!errors.phone}
            className={`${inputStyle} ${
              errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
            }`}
          />
        </div>

        {errors.phone && (
          <span className={errorStyle}>{errors.phone.message}</span>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelStyle}>
          Your Message <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <MessageSquare
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <textarea
            id="contact-message"
            rows={6}
            placeholder="Tell us how we can help you..."
            {...register("message", {
              required: "Please enter your message",
              minLength: {
                value: 10,
                message: "Message must contain at least 10 characters",
              },
            })}
            aria-invalid={!!errors.message}
            className={`${inputStyle} resize-none pl-11 ${
              errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
            }`}
          />

        </div>

        {errors.message && (
          <span className={errorStyle}>{errors.message.message}</span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#087096] px-6 py-4 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-[#065873] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle size={19} className="animate-spin" />
            Sending Your Message...
          </>
        ) : (
          <>
            <Send
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs leading-6 text-gray-400">
        Your information will only be used to respond to your inquiry.
      </p>
    </form>
  );
};

export default ContactForm;
