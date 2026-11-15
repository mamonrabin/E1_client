
"use client";

import React, { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Ruler } from "lucide-react";

interface ProductSize {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  __v?: number;
}

interface ProductColor {
  _id: string;
  colorName: string;
  colorCode: string;
  size: string | ProductSize;
}

interface ColorOrSizeFunctionProps {
  colors: ProductColor[];
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
  // Normalize size into a string
  const getSizeTitle = (size: string | ProductSize): string => {
    return typeof size === "string" ? size : size?.title || "";
  };

  // Group sizes by color
  const groupedColors = useMemo(() => {
    const grouped: Record<
      string,
      { colorCode: string; sizes: string[] }
    > = {};

    colors?.forEach((item) => {
      if (!item.colorName || !item.size) return;

      if (!grouped[item.colorName]) {
        grouped[item.colorName] = {
          colorCode: item.colorCode || "#ffffff",
          sizes: [],
        };
      }

      const sizeTitle = getSizeTitle(item.size);

      if (
        sizeTitle &&
        !grouped[item.colorName].sizes.includes(sizeTitle)
      ) {
        grouped[item.colorName].sizes.push(sizeTitle);
      }
    });

    return grouped;
  }, [colors]);

  const colorNames = useMemo(
    () => Object.keys(groupedColors),
    [groupedColors]
  );

  const availableSizes = groupedColors[selectedColor]?.sizes || [];

  // Initialize color and size
  useEffect(() => {
    if (!selectedColor && colorNames.length > 0) {
      const firstColor = colorNames[0];

      setSelectedColor(firstColor);

      const firstSize = groupedColors[firstColor]?.sizes[0];

      setSelectedSize(firstSize || "");
    }
  }, [
    selectedColor,
    colorNames,
    groupedColors,
    setSelectedColor,
    setSelectedSize,
  ]);

  // Validate selected size when color changes
  useEffect(() => {
    if (!selectedColor) return;

    if (!availableSizes.length) {
      if (selectedSize) setSelectedSize("");
      return;
    }

    if (!availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [
    selectedColor,
    availableSizes,
    selectedSize,
    setSelectedSize,
  ]);

  // Handle color selection
  const handleColorChange = (colorName: string) => {
    if (colorName === selectedColor) return;

    setSelectedColor(colorName);

    const firstSize = groupedColors[colorName]?.sizes[0];

    setSelectedSize(firstSize || "");
  };

  // No product options
  if (!colorNames.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-400">
          No color or size options available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* COLOR SELECTOR */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900">
              Color
            </p>

            <span className="text-xs text-gray-400">/</span>

            <AnimatePresence mode="wait">
              <motion.span
                key={selectedColor}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-medium uppercase tracking-wide text-primary"
              >
                {selectedColor || "Select color"}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="text-[10px] text-gray-400">
            {colorNames.length}{" "}
            {colorNames.length === 1 ? "Color" : "Colors"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {colorNames.map((colorName) => {
            const isSelected = selectedColor === colorName;
            const colorCode = groupedColors[colorName].colorCode;

            return (
              <motion.button
                key={colorName}
                type="button"
                onClick={() => handleColorChange(colorName)}
                whileTap={{ scale: 0.88 }}
                aria-label={`Select ${colorName} color`}
                aria-pressed={isSelected}
                title={colorName}
                className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
              >
                {isSelected && (
                  <motion.span
                    layoutId="selected-color-ring"
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                    }}
                  />
                )}

                <span
                  className={`h-6 w-6 rounded-full border border-black/10 shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                    isSelected ? "scale-90" : ""
                  }`}
                  style={{ backgroundColor: colorCode }}
                />

                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check
                      size={12}
                      className={
                        ["#ffffff", "#fff", "white"].includes(
                          colorCode.toLowerCase()
                        )
                          ? "text-black"
                          : "text-white drop-shadow-md"
                      }
                      strokeWidth={3}
                    />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* SIZE SELECTOR */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900">
              Size
            </p>

            <span className="text-xs text-gray-400">/</span>

            <span className="text-xs font-medium text-primary">
              {selectedSize || "Select size"}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 transition-colors hover:text-primary"
          >
            <Ruler size={13} />
            Size guide
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedColor}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {availableSizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <motion.button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  whileTap={{ scale: 0.94 }}
                  aria-pressed={isSelected}
                  className={`relative flex min-w-11 items-center justify-center overflow-hidden rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/15"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {size}
                </motion.button>
              );
            })}

            {!availableSizes.length && (
              <p className="text-xs text-gray-400">
                No sizes available for this color.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SELECTION SUMMARY */}
      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
        <Check size={14} className="text-primary" />

        <p className="text-[10px] text-gray-500">
          Selected:
          <span className="ml-1 font-semibold uppercase text-gray-800">
            {selectedColor || "—"} / {selectedSize || "—"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ColorOrSizeFunction;
