
import LottieFiles from "@/src/utilits/LottieFiles";
import PurchasedDay from "@/src/utilits/PurchasedDay";
import React from "react";


const page = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="md:text-xl text-base">Purchased Itemsc</h2>
        <PurchasedDay />
      </div>

      <div className="flex items-center justify-center mt-20">
        <LottieFiles />
      </div>
    </div>
  );
};

export default page;
