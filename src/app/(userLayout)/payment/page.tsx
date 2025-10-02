
import LottieFiles from "@/src/utilits/LottieFiles";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="md:text-xl text-base">My Orders</h2>

      <div className="flex flex-col items-center justify-center mt-20">
        <LottieFiles />

        <h1 className="mt-4 text-gray-500">No data found!</h1>
      </div>
    </div>
  );
};

export default page;
