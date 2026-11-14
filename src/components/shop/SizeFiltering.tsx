
"use client";

import { TSize } from "@/src/types";
import React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface SizeFilteringProps {
  sizes: TSize[];
  updateParams: (type: string, value: string) => void;
}

const SizeFiltering: React.FC<SizeFilteringProps> = ({
  sizes,
  updateParams,
}) => {
  const searchParams = useSearchParams();
  const selectedSize = searchParams.get("size");

  return (
    <div className="flex flex-wrap gap-2">
      {sizes?.map((size, index) => {
        const active = selectedSize === size._id;

        return (
          <motion.button
            key={size._id}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => updateParams("size", size._id)}
            aria-pressed={active}
            className={`flex h-9 min-w-10 items-center justify-center rounded-sm border px-3 text-xs font-medium uppercase transition-all duration-200 ${
              active
                ? "border-[#087096] bg-[#087096] text-white shadow-sm"
                : "border-[#202020]/15 bg-white text-[#202020]/75 hover:border-[#087096] hover:text-[#087096]"
            }`}
          >
            {size.title}
          </motion.button>
        );
      })}
    </div>
  );
};

export default SizeFiltering;
