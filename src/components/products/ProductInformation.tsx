"use client";
import React, { useState } from "react";
import ProductReview from "./ProductReview";

const ProductInformation = ({details}:{details:string}) => {
  const tabs = ["Details", "More Information", "Review"];
  const [activeTab, setActiveTab] = useState("Details");

  return (
    <div className="mt-8">
      {/* Tab Headers */}
      <div className="flex items-center uppercase border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase md:text-base text-sm font-medium cursor-pointer  px-4 py-2 transition-all duration-300 ${
              activeTab === tab
                ? " text-secondary  border-b border-secondary"
                : "bg-white text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 border rounded-[2px] p-4">
        {activeTab === "Details" && (
          <div>
            <h2 className="text-base font-semibold mb-2 text-primary">
              Product Details
            </h2>
            <div className="text-sm flex flex-col gap-4 text-gray-500">
             <p>{details}</p>
            </div>
          </div>
        )}
        {activeTab === "More Information" && (
          <div>
            <h2 className="text-base font-semibold mb-2 text-primary">
              More Information
            </h2>
            <div className="flex gap-8">
              <div className="font-medium text-sm text-[#262626] flex flex-col gap-2">
                <p>Manufacturer</p>
                <p>Color</p>
                <p>Size</p>
              </div>

              <div className="text-sm text-gray-500 flex flex-col gap-2">
                <p>Agatha Stewart</p>
                <p>Blue</p>
                <p>45cm</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Review" && (
          <div>
            <ProductReview />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
