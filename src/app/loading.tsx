"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="relative w-[120px] h-[120px]">
        {/* Circular spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
