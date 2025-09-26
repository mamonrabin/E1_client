"use client";

import { TProducts } from "@/src/types";
import { useEffect, useState } from "react";

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
  // 🟢 Find highest product price
  const calculatedMaxPrice =
    products.length > 0
      ? Math.max(...products.map((p) => p.price || p.mrpPrice || 0))
      : 0;

  const [min, setMin] = useState(minPrice ?? 0);
  const [max, setMax] = useState(maxPrice ?? calculatedMaxPrice);

  // ✅ Only update max if products change AND no external maxPrice is provided
  useEffect(() => {
    if (products.length > 0 && !maxPrice) {
      const highestPrice = Math.max(...products.map((p) => p.price || p.mrpPrice || 0));
      setMax(highestPrice);
      onMaxChange(highestPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleMinChange = (value: number) => {
    const safeMax = max ?? 0;
    const newMin = value <= safeMax ? value : safeMax;
    setMin(newMin);
    onMinChange(newMin);
  };

  const handleMaxChange = (value: number) => {
    const safeMin = min ?? 0;
    const newMax = value >= safeMin ? value : safeMin;
    setMax(newMax);
    onMaxChange(newMax);
  };

  return (
    <div className="group border-b border-gray-200">
      <div className="pb-4">
        <div className="relative my-4">
          {/* background line */}
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded" />
          {/* active range */}
          <div
            className="absolute top-1/2 h-1 bg-black rounded"
            style={{
              left: `${((min ?? 0) / calculatedMaxPrice) * 100}%`,
              right: `${100 - ((max ?? 0) / calculatedMaxPrice) * 100}%`,
            }}
          />

          {/* min slider */}
          <input
            type="range"
            min="0"
            max={calculatedMaxPrice}
            value={min ?? 0}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="absolute z-20 top-[2px] w-full appearance-none h-0 range-thumb"
          />

          {/* max slider */}
          <input
            type="range"
            min="0"
            max={calculatedMaxPrice}
            value={max ?? 0}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="absolute z-10 top-[2px] w-full appearance-none h-3 range-thumb bg-transparent"
          />
        </div>

        {/* input boxes */}
        <div className="flex items-center gap-2 pt-6">
          <label className="flex items-center gap-1 border rounded px-2 py-1 text-sm">
            <span className="text-gray-500">৳</span>
            <input
              type="number"
              min={0}
              max={calculatedMaxPrice}
              value={min ?? 0}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="w-20 outline-none"
            />
          </label>

          <span className="text-gray-500">to</span>

          <label className="flex items-center gap-1 border rounded px-2 py-1 text-sm">
            <span className="text-gray-500">৳</span>
            <input
              type="number"
              min={0}
              max={calculatedMaxPrice}
              value={max ?? 0}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="w-20 outline-none"
            />
          </label>
        </div>
      </div>

      <style jsx>{`
        input[type="range"].range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
        }
        input[type="range"].range-thumb::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
