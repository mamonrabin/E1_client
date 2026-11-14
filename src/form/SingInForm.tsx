/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ForgetPassword from "./ForgetPassword";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { login } from "../services/auth";

interface SingInFormData {
  email: string;
  password: string;
}

const inputBase =
  "w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-[15px] text-[#262626] outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10";

const SingInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SingInFormData>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<SingInFormData> = async (data) => {
    setLoading(true);
    try {
      const result = await login(data);

      if (result?.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        toast.success("Login successful!");
        reset(); // clear only on success, so users can fix a typo after a failed try
        router.push("/");
      } else {
        toast.error(result?.message || "No token received");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#262626]">
          Email
        </label>
        <div className="relative">
          <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputBase} ${errors.email ? "border-red-500" : "border-primary/20"}`}
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-[#262626]">
            Password
          </label>
          <span className="text-sm text-[#474646] transition-colors duration-300 hover:text-primary">
            <ForgetPassword />
          </span>
        </div>
        <div className="relative">
          <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`${inputBase} pr-12 ${errors.password ? "border-red-500" : "border-primary/20"}`}
            {...register("password", { required: "Enter your password" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 transition-colors hover:text-primary"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-medium text-white transition-all duration-300 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-[#474646]">
        New here?{" "}
        <Link
          href="/signUp"
          className="font-medium text-primary transition-colors duration-300 hover:text-secondary"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default SingInForm;