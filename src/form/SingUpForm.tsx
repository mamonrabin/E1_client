/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone } from "lucide-react";
import { signUp } from "@/src/services/auth";

interface SignUpFormData {
  email: string;
  password: string;
  phone: string;
  name: string;
}

const inputBase =
  "w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-[15px] text-[#262626] outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10";

const labelBase = "mb-1.5 block text-sm font-medium text-[#262626]";
const iconBase =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400";

const SingUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const password = watch("password") || "";
  // Simple strength meter: length, mixed case, number, symbol
  const strength = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const strengthLabel = ["Too weak", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-gray-200", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"][strength];

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setLoading(true);
    try {
      const result = await signUp(data);

      if (result?.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        toast.success("Signup successful!");
        reset(); // clear only on success, so users can fix mistakes after a failed try
        router.push("/");
      } else {
        toast.error(result?.message || "No token received");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const border = (hasError: boolean) => (hasError ? "border-red-500" : "border-primary/20");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelBase}>Full name</label>
        <div className="relative">
          <User size={18} className={iconBase} />
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputBase} ${border(!!errors.name)}`}
            {...register("name", { required: "Enter your name" })}
          />
        </div>
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelBase}>Email</label>
        <div className="relative">
          <Mail size={18} className={iconBase} />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputBase} ${border(!!errors.email)}`}
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

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelBase}>Phone number</label>
        <div className="relative">
          <Phone size={18} className={iconBase} />
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${inputBase} ${border(!!errors.phone)}`}
            {...register("phone", {
              required: "Enter your phone number",
              pattern: {
                value: /^\+?[0-9\s-]{7,15}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
        </div>
        {errors.phone && (
          <p id="phone-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className={labelBase}>Password</label>
        <div className="relative">
          <Lock size={18} className={iconBase} />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : "password-hint"}
            className={`${inputBase} pr-12 ${border(!!errors.password)}`}
            {...register("password", {
              required: "Enter a password",
              minLength: { value: 6, message: "Use at least 6 characters" },
            })}
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

        {errors.password ? (
          <p id="password-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.password.message}
          </p>
        ) : (
          password && (
            <div id="password-hint" className="mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= strength ? strengthColor : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">Password strength: {strengthLabel}</p>
            </div>
          )
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-medium text-white transition-all duration-300 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? "Creating account..." : "Create account"}
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-[#474646]">
        Already have an account?{" "}
        <Link
          href="/signIn"
          className="font-medium text-primary transition-colors duration-300 hover:text-secondary"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SingUpForm;