/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';

const ColorOrSizeFunction = ({colors}) => {
     // Group colors by colorName
      const groupedColors: Record<
        string,
        { colorCode: string; sizes: { _id: string; title: string }[] }
      > = {};
    
      colors?.forEach((c) => {
        if (!groupedColors[c.colorName]) {
          groupedColors[c.colorName] = { colorCode: c.colorCode, sizes: [] };
        }
        groupedColors[c.colorName].sizes.push(c.size);
      });
    
      const colorNames = Object.keys(groupedColors);
      const [selectedColor, setSelectedColor] = useState<string>(colorNames[0]);
    
      // Track selected size
      const [selectedSize, setSelectedSize] = useState<string>(
        groupedColors[selectedColor]?.sizes[0]?._id || ""
      );
    
      // Reset size when color changes
      useEffect(() => {
        if (groupedColors[selectedColor]?.sizes?.length > 0) {
          setSelectedSize(groupedColors[selectedColor].sizes[0]._id);
        }
      }, [selectedColor]);
    return (
        <div>
            <div className="mt-2 text-sm text-primary">
              <p className="font-semibold">
                Color :{" "}
                <span className="font-normal uppercase">{selectedColor}</span>
              </p>

              <div className="flex items-center gap-2 mt-1 cursor-pointer">
                {colorNames.map((colorName) => (
                  <div key={colorName}>
                    <p
                      className={`w-7 h-7 rounded-full border border-primary/20 ${
                        selectedColor === colorName
                          ? "ring-2 ring-primary"
                          : ""
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

            {/* Sizes */}
            <div className="mt-2 text-sm text-primary">
              <p className="font-semibold">
                Size :{" "}
                <span className="font-normal uppercase">
                  {
                    groupedColors[selectedColor].sizes.find(
                      (s) => s._id === selectedSize
                    )?.title || "N/A"
                  }
                </span>
              </p>

              <p className="font-semibold flex gap-2 mt-2">
                {groupedColors[selectedColor].sizes.map((s) => (
                  <span
                    key={s._id}
                    onClick={() => setSelectedSize(s._id)}
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