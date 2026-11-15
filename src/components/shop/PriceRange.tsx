
"use client";

import { TProducts } from "@/src/types";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface PriceRangeFilterProps {
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinChange: (min: number) => void;
  onMaxChange: (max: number) => void;
  products?: TProducts[] | null;
}

export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  products = [],
}: PriceRangeFilterProps) {
  // Ensure products is always an array.
  const safeProducts = Array.isArray(products) ? products : [];

  // Calculate maximum product price.
  const calculatedMaxPrice = useMemo(() => {
    let highest = 1;

    for (const product of safeProducts) {
      const price = Number(
        product?.price || product?.mrpPrice || 0
      );

      if (Number.isFinite(price) && price > highest) {
        highest = price;
      }
    }

    return highest;
  }, [safeProducts]);

  // Local state.
  const [localMin, setLocalMin] = useState<number | null>(null);
  const [localMax, setLocalMax] = useState<number | null>(null);

  // URL values have priority.
  const min = minPrice ?? localMin ?? 0;

  const max =
    maxPrice ??
    localMax ??
    calculatedMaxPrice;

  // Prevent invalid ranges.
  const safeMin = Math.max(
    0,
    Math.min(Number(min) || 0, calculatedMaxPrice)
  );

  const safeMax = Math.max(
    safeMin,
    Math.min(
      Number(max) || calculatedMaxPrice,
      calculatedMaxPrice
    )
  );

  const minPercentage =
    (safeMin / calculatedMaxPrice) * 100;

  const maxPercentage =
    (safeMax / calculatedMaxPrice) * 100;

  // Minimum price handler.
  const handleMinChange = (value: number) => {
    const newMin = Math.max(
      0,
      Math.min(value, safeMax)
    );

    setLocalMin(newMin);
    onMinChange(newMin);
  };

  // Maximum price handler.
  const handleMaxChange = (value: number) => {
    const newMax = Math.min(
      calculatedMaxPrice,
      Math.max(value, safeMin)
    );

    setLocalMax(newMax);
    onMaxChange(newMax);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      {/* Price Labels */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-400">
            Minimum
          </p>

          <p className="mt-1 text-sm font-semibold text-[#202020]">
            ৳{safeMin.toLocaleString("en-BD")}
          </p>
        </div>

        <div className="text-xs text-gray-400">
          TO
        </div>

        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wider text-gray-400">
            Maximum
          </p>

          <p className="mt-1 text-sm font-semibold text-[#202020]">
            ৳{safeMax.toLocaleString("en-BD")}
          </p>
        </div>
      </div>

      {/* Dual Range Slider */}
      <div className="relative mb-7 mt-6 h-5">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />

        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#087096]"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`,
          }}
        />

        {/* Minimum Slider */}
        <input
          type="range"
          min={0}
          max={calculatedMaxPrice}
          step={1}
          value={safeMin}
          onChange={(e) =>
            handleMinChange(Number(e.target.value))
          }
          aria-label="Minimum price"
          className="price-range-input absolute inset-0 z-20"
        />

        {/* Maximum Slider */}
        <input
          type="range"
          min={0}
          max={calculatedMaxPrice}
          step={1}
          value={safeMax}
          onChange={(e) =>
            handleMaxChange(Number(e.target.value))
          }
          aria-label="Maximum price"
          className="price-range-input absolute inset-0 z-10"
        />
      </div>

      {/* Manual Price Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {/* Minimum */}
        <label className="flex items-center gap-2 rounded-sm border border-gray-200 px-3 py-2.5 transition-colors focus-within:border-[#087096]">
          <span className="text-sm text-gray-400">
            ৳
          </span>

          <input
            type="number"
            min={0}
            max={safeMax}
            value={safeMin}
            onChange={(e) =>
              handleMinChange(Number(e.target.value))
            }
            aria-label="Minimum price amount"
            className="w-full min-w-0 bg-transparent text-sm font-medium text-[#202020] outline-none"
          />
        </label>

        {/* Maximum */}
        <label className="flex items-center gap-2 rounded-sm border border-gray-200 px-3 py-2.5 transition-colors focus-within:border-[#087096]">
          <span className="text-sm text-gray-400">
            ৳
          </span>

          <input
            type="number"
            min={safeMin}
            max={calculatedMaxPrice}
            value={safeMax}
            onChange={(e) =>
              handleMaxChange(Number(e.target.value))
            }
            aria-label="Maximum price amount"
            className="w-full min-w-0 bg-transparent text-sm font-medium text-[#202020] outline-none"
          />
        </label>
      </div>

      {/* Slider Styling */}
      <style jsx>{`
        .price-range-input {
          width: 100%;
          height: 20px;
          margin: 0;
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          pointer-events: none;
          outline: none;
        }

        .price-range-input::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #087096;
          border: 3px solid white;
          box-shadow: 0 0 0 1px #087096;
          cursor: grab;
          pointer-events: auto;
        }

        .price-range-input::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #087096;
          border: 3px solid white;
          box-shadow: 0 0 0 1px #087096;
          cursor: grab;
          pointer-events: auto;
        }

        .price-range-input:active::-webkit-slider-thumb {
          cursor: grabbing;
          box-shadow: 0 0 0 4px rgb(8 112 150 / 15%);
        }
      `}</style>
    </motion.div>
  );
}
