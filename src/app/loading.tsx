"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-[#fff] flex justify-center items-center">
      <div className="relative w-[120px] h-[120px]">
        {/* Circular spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-white border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

        {/* Center logo (optional) */}
        {/* 
        <Image
          src={logo}
          alt="Loading"
          width={80}
          height={80}
          className="rounded-full object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          priority
        />
        */}
      </div>
    </div>
  );
};

export default Loading;
