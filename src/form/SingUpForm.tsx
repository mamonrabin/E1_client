/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { signUp } from "@/src/services/auth";

interface SignUpFormData {
  email: string;
  password: string;
  phone: string;
  name: string;
}

const SingUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setLoading(true);
    try {
      const result = await signUp(data); // ✅ use service function

      if (result?.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        toast.success("Signup successful!");
        router.push("/"); // redirect home
      } else {
        toast.error(result?.message || "No token received");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-4 flex flex-col gap-2 px-12"
    >
      <input
        {...register("name", { required: true })}
        className="px-2 py-3 border border-primary/20 outline-none"
        type="text"
        placeholder="Name"
      />
      {errors.name && <span className="text-red-500">name is required</span>}

      <input
        {...register("email", { required: true })}
        className="px-2 py-3 border border-primary/20 outline-none"
        type="email"
        placeholder="Email"
      />
      {errors.email && <span className="text-red-500">email is required</span>}

      <input
        {...register("phone", { required: true })}
        className="px-2 py-3 border border-primary/20 outline-none"
        type="text"
        placeholder="Phone Number"
      />
      {errors.phone && <span className="text-red-500">phone is required</span>}

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
        <span className="text-red-500">password is required</span>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-2 py-3 bg-primary text-white cursor-pointer hover:bg-secondary duration-300 font-medium transition-all outline-none"
      >
        {loading ? "sign up..." : "Sign Up"}
      </button>

      <p className="text-center py-4 text-[#474646]">
        Already have an account?{" "}
        <Link href="/signIn">
          <span className="font-medium text-primary cursor-pointer capitalize hover:text-secondary duration-300">
            Sign in
          </span>
        </Link>
      </p>
    </form>
  );
};

export default SingUpForm;
