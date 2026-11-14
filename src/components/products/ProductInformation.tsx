
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Info,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import ProductReview from "./ProductReview";

const tabs = [
  {
    label: "Details",
    icon: FileText,
    description: "Product description",
  },
  {
    label: "More Information",
    icon: Info,
    description: "Product specifications",
  },
  {
    label: "Review",
    icon: MessageCircle,
    description: "Customer feedback",
  },
];

interface ProductInformationProps {
  details: string;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  details,
}) => {
  const [activeTab, setActiveTab] = useState("Details");

  const activeIndex = tabs.findIndex((tab) => tab.label === activeTab);

  return (
    <section className="mt-12 w-full">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Discover More
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Product Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Everything you need to know before making your choice.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="relative border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                aria-selected={isActive}
                role="tab"
                className={`relative flex shrink-0 items-center gap-2 px-4 py-4 text-xs font-semibold transition-colors duration-300 sm:px-6 sm:text-sm ${
                  isActive
                    ? "text-primary"
                    : "text-gray-400 hover:text-gray-800"
                }`}
              >
                <Icon
                  size={16}
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}
                />

                <span>{tab.label}</span>

                {isActive && (
                  <motion.span
                    layoutId="product-info-tab-indicator"
                    className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-5 min-h-[180px] overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-[0_4px_25px_rgba(0,0,0,0.025)] sm:p-6 md:p-7">
        <AnimatePresence mode="wait">
          {activeTab === "Details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText size={19} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Product Details
                  </h3>
                  <p className="text-xs text-gray-400">
                    About this product
                  </p>
                </div>
              </div>

              {details ? (
                <div className="whitespace-pre-line text-sm leading-7 text-gray-600">
                  {details}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 px-4 py-6 text-center">
                  <p className="text-sm text-gray-400">
                    No product description available.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "More Information" && (
            <motion.div
              key="more-information"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Info size={19} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    More Information
                  </h3>
                  <p className="text-xs text-gray-400">
                    Product specifications
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-100">
                {[
                  { label: "Manufacturer", value: "Agatha Stewart" },
                  { label: "Color", value: "Blue" },
                  { label: "Size", value: "45cm" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between gap-4 px-4 py-4 text-sm transition-colors hover:bg-gray-50 ${
                      index !== 2 ? "border-b border-gray-100" : ""
                    } ${index % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                  >
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>

                    <span className="text-right text-gray-500">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Sparkles size={14} className="text-primary" />
                <span>Crafted with attention to every detail.</span>
              </div>
            </motion.div>
          )}

          {activeTab === "Review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageCircle size={19} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Customer Reviews
                  </h3>
                  <p className="text-xs text-gray-400">
                    Opinions and experiences from customers
                  </p>
                </div>
              </div>

              <ProductReview />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductInformation;
