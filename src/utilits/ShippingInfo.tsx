"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const ShippingInfo = () => {
  const [isPlusAccording, setIsPlusAccording] = useState<number | null>(null);

  const handleBorderClick = (index: number) => {
    setIsPlusAccording((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className="mt-6">
        <ul className="flex flex-col gap-2">
          <li>
            <p
              onClick={() => handleBorderClick(0)}
              className={`text-[15px] text-[#262626]/80 font-medium flex items-center justify-between py-2 border-b duration-300 ${
                isPlusAccording === 0
                  ? "border-[#262626]/20"
                  : "border-[#262626]/20"
              } text-lg cursor-pointer`}
            >
              Shipping information
              <motion.span
                // animate={{ rotate: isPlusAccording === 0 ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isPlusAccording === 0 ? (
                  <Minus size={16} className="text-xl text-primary" />
                ) : (
                  <Plus size={16} className="text-xl text-primary" />
                )}
              </motion.span>
            </p>

            <AnimatePresence initial={false}>
              {isPlusAccording === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pt-2 bg-white my-2 text-sm rounded  text-[#262626]/60 flex flex-col gap-2">
                    <span>- No EU import duties.</span>
                    <span>- Ships within 1-2 business days.</span>
                    <span>
                      - Ships in our fully recyclable and biodegradable
                      signature boxes.
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingInfo;
