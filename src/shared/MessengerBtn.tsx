
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  ChevronUp,
} from "lucide-react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

const MessengerBtn = () => {
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    {
      name: "WhatsApp",
      description: "Chat with us",
      href: "https://wa.me/8801746770324",
      icon: <FaWhatsapp size={21} />,
      bg: "bg-[#25D366]",
    },
    {
      name: "Messenger",
      description: "Send us a message",
      href: "https://m.me/107585752267101",
      icon: <FaFacebookMessenger size={21} />,
      bg: "bg-[#0876F9]",
    },
  ];

  return (
    <div className="fixed bottom-6 right-5 z-[100] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {/* Contact options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="mb-1 flex flex-col items-end gap-3"
          >
            {options.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.25,
                }}
              >
                <Link
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact us on ${option.name}`}
                  className="group flex items-center gap-3"
                >
                  {/* Text label */}
                  <span className="rounded-lg border border-gray-100 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-lg transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary">
                    <span className="block">{option.name}</span>
                    <span className="mt-0.5 block text-[10px] font-normal text-gray-400">
                      {option.description}
                    </span>
                  </span>

                  {/* Icon */}
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl ${option.bg}`}
                  >
                    {option.icon}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <div className="relative">
        {!showOptions && (
          <motion.span
            animate={{
              scale: [1, 1.65],
              opacity: [0.35, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        )}

        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowOptions((prev) => !prev)}
          aria-label={showOptions ? "Close contact options" : "Open contact options"}
          aria-expanded={showOptions}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_25px_rgba(8,112,150,0.35)] transition-colors duration-300 hover:bg-[#075D7C] sm:h-16 sm:w-16"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={showOptions ? "close" : "message"}
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {showOptions ? (
                <X size={25} />
              ) : (
                <MessageCircle size={25} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default MessengerBtn;
