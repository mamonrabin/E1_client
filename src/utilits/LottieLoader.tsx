"use client";
import React from "react";
import loader from "@/src/assets/animatedfile/loader.json";
import Lottie from "lottie-react";
const LottieLoader = () => {
  return (
    <Lottie className="md:w-80 w-40" animationData={loader} loop={true} />
  );
};

export default LottieLoader;
