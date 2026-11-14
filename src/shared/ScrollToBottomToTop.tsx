
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToBottomToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrollTop > 300);

      const percentage =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(Math.min(100, percentage));
    };

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className="group fixed bottom-24 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#087096] text-white shadow-[0_6px_20px_rgba(8,112,150,0.3)] transition-colors duration-300 hover:bg-[#075D7C] sm:bottom-28 sm:right-8 sm:h-14 sm:w-14"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r="25"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="2"
            />

            <motion.circle
              cx="28"
              cy="28"
              r="25"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 25}
              animate={{
                strokeDashoffset:
                  2 * Math.PI * 25 * (1 - progress / 100),
              }}
              transition={{ duration: 0.2 }}
            />
          </svg>

          {/* Arrow */}
          <ArrowUp
            size={21}
            strokeWidth={2.2}
            className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToBottomToTop;
