import logo from "@/src/assets/logo/logo-white.svg";
import coverImg from "@/src/assets/images/sign-in.jpg";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SingInForm from "@/src/form/SingInForm";


const page = () => {
  return (
    <div className="bg-[#262626] w-full py-8 Container">
      <div className="">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className="pb-4"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white lg:w-2/4 w-full  overflow-hidden">
          <div className="relative">
            <Image
              src={coverImg}
              alt=""
              width={800}
              height={800}
              className="w-full h-full"
            />

            <p className="uppercase text-lg font-semibold absolute px-12 bottom-[20px] text-white">
              Sign in
            </p>
          </div>

          <div>
            <SingInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
