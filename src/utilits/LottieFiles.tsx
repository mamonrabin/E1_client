"use client";
import React from "react";
import SearchLoti from "@/assets/animatedfile/MRzkTPRYob.json";
import Lottie from "lottie-react";
const LottieFiles = () => {
  return (
    <Lottie className="md:w-70 w-40" animationData={SearchLoti} loop={true} />
  );
};

export default LottieFiles;
