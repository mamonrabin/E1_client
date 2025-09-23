"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ForgetPassword from "./ForgetPassword";
import { Eye, EyeOff } from "lucide-react"; // Eye icons

interface SingInFormData {
  email: string;
  password: string;
}

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
    console.log("Form Data:", data);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!");
      router.push("/");
      reset();
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-4 flex flex-col gap-2 px-12"
    >
      {/* Email Input */}
      <input
        {...register("email", { required: true })}
        className="px-2 py-3 border border-primary/20 outline-none"
        type="text"
        placeholder="Email"
      />
      {errors.email && (
        <span className="text-red-500 capitalize">email is required</span>
      )}

      {/* Password Input with Eye Icon */}
      <div className="relative">
        <input
          {...register("password", { required: true })}
          className="px-2 py-3 border border-primary/20 outline-none w-full pr-10"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {errors.password && (
        <span className="text-red-500 capitalize">password is required</span>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-2 py-3 bg-primary text-white cursor-pointer hover:bg-secondary duration-300 font-medium transition-all outline-none"
      >
        {loading && <span className="animate-spin rounded-full"></span>}
        {loading ? "sign in..." : "Sign In"}
      </button>

      {/* Links */}
      <div>
        <p className="text-[#474646] cursor-pointer duration-300 hover:text-primary">
          <ForgetPassword />
        </p>
        <p className="text-center py-4 text-[#474646]">
          If you are new here{" "}
          <Link href="/signUp">
            <span className="font-medium text-primary cursor-pointer capitalize hover:text-secondary duration-300">
              create account first
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SingInForm;
