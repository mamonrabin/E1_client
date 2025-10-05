"use client";

import React from "react";
import Lottie from "lottie-react";
import loader from "@/src/assets/animatedfile/loader.json"; // ✅ Correct alias

const LottieLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Lottie
        animationData={loader}
        loop
        className="w-40 md:w-80"
      />
    </div>
  );
};

export default LottieLoader;
