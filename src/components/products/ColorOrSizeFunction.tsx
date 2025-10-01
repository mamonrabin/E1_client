/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

interface ColorOrSizeFunctionProps {
  colors: any[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const ColorOrSizeFunction: React.FC<ColorOrSizeFunctionProps> = ({
  colors,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}) => {
  const groupedColors: Record<
    string,
    { colorCode: string; sizes: { _id: string; title: string }[] }
  > = {};

  colors?.forEach((c: any) => {
    if (!groupedColors[c.colorName]) {
      groupedColors[c.colorName] = { colorCode: c.colorCode, sizes: [] };
    }
    groupedColors[c.colorName].sizes.push(c.size);
  });

  const colorNames = Object.keys(groupedColors);

  useEffect(() => {
    if (!selectedColor && colorNames.length) {
      setSelectedColor(colorNames[0]);
    }
  }, [colorNames, selectedColor, setSelectedColor]);

  useEffect(() => {
    if (
      selectedColor &&
      groupedColors[selectedColor]?.sizes?.length > 0 &&
      !selectedSize
    ) {
      setSelectedSize(groupedColors[selectedColor].sizes[0].title );
    }
  }, [selectedColor, groupedColors, selectedSize, setSelectedSize]);

  return (
    <div>
      {/* Color Selector */}
      <div className="mt-2 text-sm text-primary">
        <p className="font-semibold">
          Color:{" "}
          <span className="font-normal uppercase">{selectedColor || "N/A"}</span>
        </p>
        <div className="flex items-center gap-2 mt-1 cursor-pointer">
          {colorNames.map((colorName) => (
            <div key={colorName}>
              <p
                className={`w-7 h-7 rounded-full border border-primary/20 ${
                  selectedColor === colorName ? "ring-2 ring-primary" : ""
                }`}
                style={{
                  backgroundColor: groupedColors[colorName].colorCode,
                }}
                onClick={() => setSelectedColor(colorName)}
              ></p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mt-2 text-sm text-primary">
        <p className="font-semibold">
          Size:{" "}
          <span className="font-normal uppercase">
            {groupedColors[selectedColor]?.sizes.find(
              (s) => s._id === selectedSize
            )?.title || "N/A"}
          </span>
        </p>

        <p className="font-semibold flex gap-2 mt-2">
          {groupedColors[selectedColor]?.sizes?.map((s) => (
            <span
              key={s._id}
              onClick={() => setSelectedSize(s.title)}
              className={`px-2 py-1 border rounded cursor-pointer ${
                selectedSize === s._id
                  ? "bg-primary text-white border-primary"
                  : "hover:bg-gray-100"
              }`}
            >
              {s.title.toUpperCase()}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ColorOrSizeFunction;
