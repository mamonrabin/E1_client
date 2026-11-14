import logo from "@/src/assets/logo/logo-white.svg";
import logoDark from "@/src/assets/logo/logo-black.svg";
import coverImg from "@/src/assets/images/sing.webp";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SingInForm from "@/src/form/SingInForm";

const Page = () => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#262626] py-8 Container">
      {/* Top logo */}
      <Link href="/" aria-label="Go to homepage" className="w-fit">
        <Image src={logo} alt="Logo" width={100} height={40} className="h-auto w-[100px]" />
      </Link>

      <div className="flex flex-1 items-center justify-center py-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative h-44 sm:h-60 lg:h-auto lg:min-h-[620px]">
            <Image
              src={coverImg}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-10">
              <h2 className="text-2xl font-semibold tracking-tight lg:text-4xl">
                Welcome back
              </h2>
              <p className="mt-2 max-w-sm text-sm text-white/80 lg:text-base">
                Sign in to track your orders and check out faster.
              </p>
            </div>
          </div>

          {/* Form side */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14">
            <Image
              src={logoDark}
              alt=""
              width={80}
              height={32}
              className="mb-8 hidden h-auto w-[80px] lg:block"
            />
            <h1 className="text-2xl font-semibold tracking-tight text-[#262626]">
              Sign in to your account
            </h1>
            <p className="mb-8 mt-1 text-sm text-[#474646]">
              Enter your email and password to continue.
            </p>

            <SingInForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;