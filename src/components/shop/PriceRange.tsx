
"use client";

import { TProducts } from "@/src/types";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface PriceRangeFilterProps {
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinChange: (min: number) => void;
  onMaxChange: (max: number) => void;
  products: TProducts[];
}

export default function PriceRangeFilter({
  minPrice = 0,
  maxPrice,
  onMinChange,
  onMaxChange,
  products,
}: PriceRangeFilterProps) {
  const calculatedMaxPrice = useMemo(() => {
    return Math.max(
      1,
      ...products.map((product) =>
        Number(product.price || product.mrpPrice || 0)
      )
    );
  }, [products]);

  const [min, setMin] = useState(minPrice ?? 0);
  const [max, setMax] = useState(maxPrice || calculatedMaxPrice);

  // Sync with URL filters.
  useEffect(() => {
    setMin(minPrice ?? 0);
  }, [minPrice]);

  useEffect(() => {
    setMax(maxPrice || calculatedMaxPrice);
  }, [maxPrice, calculatedMaxPrice]);

  // Initialize maximum price when no maximum is selected.
  useEffect(() => {
    if (!maxPrice && products.length > 0) {
      setMax(calculatedMaxPrice);
      onMaxChange(calculatedMaxPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatedMaxPrice, maxPrice]);

  const safeMin = Math.min(min, calculatedMaxPrice);
  const safeMax = Math.max(safeMin, Math.min(max, calculatedMaxPrice));

  const minPercentage = (safeMin / calculatedMaxPrice) * 100;
  const maxPercentage = (safeMax / calculatedMaxPrice) * 100;

  const handleMinChange = (value: number) => {
    const newMin = Math.max(
      0,
      Math.min(value, safeMax)
    );

    setMin(newMin);
    onMinChange(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.min(
      calculatedMaxPrice,
      Math.max(value, safeMin)
    );

    setMax(newMax);
    onMaxChange(newMax);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Price labels */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-400">
            Minimum
          </p>
          <p className="mt-1 text-sm font-semibold text-[#202020]">
            ৳{safeMin.toLocaleString("en-BD")}
          </p>
        </div>

        <div className="text-xs text-gray-400">TO</div>

        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wider text-gray-400">
            Maximum
          </p>
          <p className="mt-1 text-sm font-semibold text-[#202020]">
            ৳{safeMax.toLocaleString("en-BD")}
          </p>
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative mb-7 mt-6 h-5">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />

        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#087096]"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`,
          }}
        />

        <input
          type="range"
          min={0}
          max={calculatedMaxPrice}
          step={1}
          value={safeMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          aria-label="Minimum price"
          className="price-range-input absolute inset-0 z-20"
        />

        <input
          type="range"
          min={0}
          max={calculatedMaxPrice}
          step={1}
          value={safeMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          aria-label="Maximum price"
          className="price-range-input absolute inset-0 z-10"
        />
      </div>

      {/* Price inputs */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 rounded-sm border border-gray-200 px-3 py-2.5 transition-colors focus-within:border-[#087096]">
          <span className="text-sm text-gray-400">৳</span>
          <input
            type="number"
            min={0}
            max={safeMax}
            value={safeMin}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            aria-label="Minimum price amount"
            className="w-full min-w-0 bg-transparent text-sm font-medium text-[#202020] outline-none"
          />
        </label>

        <label className="flex items-center gap-2 rounded-sm border border-gray-200 px-3 py-2.5 transition-colors focus-within:border-[#087096]">
          <span className="text-sm text-gray-400">৳</span>
          <input
            type="number"
            min={safeMin}
            max={calculatedMaxPrice}
            value={safeMax}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            aria-label="Maximum price amount"
            className="w-full min-w-0 bg-transparent text-sm font-medium text-[#202020] outline-none"
          />
        </label>
      </div>

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
