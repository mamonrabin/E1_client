import { TSize } from "@/src/types";
import React, { useState } from "react";

interface SizeFilteringProps {
  sizes:TSize[];
  updateParams: (type: string, value: string) => void;
}

interface HandleClick {
    (sizeId: string): void;
  }

const SizeFiltering:React.FC<SizeFilteringProps> = ({ sizes, updateParams }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  

  const handleClick: HandleClick = (sizeId) => {
    setSelectedSize(sizeId);
    updateParams("size", sizeId);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2 capitalize text-sm list-none">
      {sizes?.map((size) => (
        <div
          key={size._id}
          onClick={() => handleClick(size._id)}
          className={`px-2 py-0.5 rounded-sm cursor-pointer duration-300 
            ${selectedSize === size._id ? "bg-red-500 text-white" : "bg-primary text-white hover:bg-secondary"}
          `}
        >
          {size.title}
        </div>
      ))}
    </div>
  );
};

export default SizeFiltering;
