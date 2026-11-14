
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ArrowUpRight,
  LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cartStore";

interface AddBtnProps {
  product?: any;
  counterBtn?: boolean;
  addcartBtn?: boolean;
  counterStyle?: string;
  counterMainStyle?: string;
  selectedColor?: string;
  selectedSize?: string;
  Quantity?: number;
}

const AddBtn: React.FC<AddBtnProps> = ({
  product,
  counterBtn = true,
  addcartBtn = true,
  counterStyle = "",
  counterMainStyle = "",
  selectedColor,
  selectedSize,
  Quantity,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [count, setCount] = useState(
    Quantity && Quantity > 0 ? Quantity : 1
  );

  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (Quantity && Quantity > 0) {
      setCount(Quantity);
    }
  }, [Quantity]);

  // Quantity controls
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (product?._id) {
      updateQuantity(product._id, newCount);
    }
  };

  const handleDecrement = () => {
    if (count <= 1) return;

    const newCount = count - 1;
    setCount(newCount);

    if (product?._id) {
      updateQuantity(product._id, newCount);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (isCartLoading) return;

    if (!selectedColor || !selectedSize) {
      toast.error("Please select a color and size first.");
      return;
    }

    if (!product) {
      toast.error("Product information is missing.");
      return;
    }

    setIsCartLoading(true);

    try {
      addToCart({
        product,
        color: selectedColor,
        size: selectedSize,
        quantity: count,
      });

      setIsAdded(true);

      toast.success("Product added to your bag!", {
        duration: 1800,
        position: "top-right",
      });

      // Restore button state
      setTimeout(() => {
        setIsAdded(false);
        setIsCartLoading(false);
      }, 1200);
    } catch {
      setIsCartLoading(false);
      setIsAdded(false);

      toast.error("Unable to add product to cart.");
    }
  };

  return (
    <div className={`w-full ${counterMainStyle}`}>
      <div className="flex w-full items-center gap-3">
        {/* QUANTITY SELECTOR */}
        {counterBtn && (
          <div
            className={`flex shrink-0 items-center justify-between rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md ${counterStyle}`}
          >
            <motion.button
              type="button"
              onClick={handleDecrement}
              disabled={count <= 1}
              whileTap={{ scale: 0.85 }}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Minus size={16} strokeWidth={2} />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="min-w-6 text-center text-sm font-bold tabular-nums text-gray-900"
              >
                {count}
              </motion.span>
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={handleIncrement}
              whileTap={{ scale: 0.85 }}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <Plus size={16} strokeWidth={2} />
            </motion.button>
          </div>
        )}

        {/* ADD TO CART BUTTON */}
        {addcartBtn && (
          <motion.button
            type="button"
            onClick={handleAddToCart}
            disabled={isCartLoading}
            whileTap={{ scale: 0.97 }}
            className="group relative flex min-h-[52px] flex-1 items-center justify-between overflow-hidden rounded-xl bg-primary px-4 py-3.5 text-white shadow-md shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {/* Hover background */}
            <span className="absolute inset-0 origin-left scale-x-0 bg-gray-950 transition-transform duration-500 ease-out group-hover:scale-x-100" />

            {/* Shine animation */}
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-full" />

            {/* Button content */}
            <span className="relative z-20 flex items-center gap-2.5">
              <AnimatePresence mode="wait">
                {isCartLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                  >
                    <LoaderCircle size={17} className="animate-spin" />
                  </motion.span>
                ) : isAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="bag"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                  >
                    <ShoppingBag
                      size={17}
                      className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    />
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.span
                  key={isCartLoading ? "loading" : isAdded ? "added" : "default"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] font-bold uppercase tracking-[0.14em] sm:text-xs"
                >
                  {isCartLoading
                    ? "Adding to bag..."
                    : isAdded
                      ? "Added to bag"
                      : "Add to bag"}
                </motion.span>
              </AnimatePresence>
            </span>

            <motion.span
              animate={
                isAdded
                  ? { scale: 1.15, rotate: 0 }
                  : { scale: 1, rotate: 0 }
              }
              whileHover={{ x: 3, y: -3, rotate: 45 }}
              transition={{ duration: 0.3 }}
              className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white/20"
            >
              {isAdded ? (
                <Check size={16} />
              ) : (
                <ArrowUpRight size={17} />
              )}
            </motion.span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default AddBtn;
