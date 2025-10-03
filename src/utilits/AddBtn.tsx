/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  counterStyle,
  counterMainStyle,
  selectedColor,
  selectedSize,
  Quantity,
}) => {
  const { addToCart, updateQuantity } = useCartStore();

  const [count, setCount] = useState<number>(Quantity && Quantity > 0 ? Quantity : 1);

  useEffect(() => {
    if (Quantity && Quantity > 0) {
      setCount(Quantity);
    }
  }, [Quantity]);

  console.log()

  const handleIncrement = () => {
  const newCount = count + 1;
  setCount(newCount);
  updateQuantity(product?._id, newCount); // ✅ only productId + qty
};

  const handleDecrement = () => {
  const newCount = count > 1 ? count - 1 : 1;
  setCount(newCount);
  updateQuantity(product?._id, newCount); // ✅
};

  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a color and size before adding to cart.");
      return;
    }

    if (isCartLoading) return;
    setIsCartLoading(true);

    addToCart({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity: count,
    });

    setTimeout(() => {
      setIsCartLoading(false);
      toast.success("Added to cart!", {
        duration: 600,
        position: "top-right",
      });
    }, 300);
  };

  return (
    <div>
      <div className={`flex items-center gap-2 ${counterMainStyle}`}>
        {counterBtn && (
          <div
            className={`flex items-center justify-between border border-[#262629]/40 hover:border-primary/40 duration-300 px-2 ${counterStyle}`}
          >
            <p
              onClick={handleDecrement}
              className="cursor-pointer text-[#262629]/40 hover:text-primary/60 duration-300"
            >
              <Minus size={16} />
            </p>
            <span>{count}</span>
            <p
              onClick={handleIncrement}
              className="cursor-pointer text-[#262629]/40 hover:text-primary/60 duration-300"
            >
              <Plus size={16} />
            </p>
          </div>
        )}

        {addcartBtn && (
          <div
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-secondary cursor-pointer duration-300 text-white text-center py-2.5"
          >
            <button className="text-sm outline-none cursor-pointer">
              {isCartLoading ? (
                <span>cart adding...</span>
              ) : (
                <span className="capitalize">add to cart</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBtn;
