
"use client";

import { apiBaseUrl } from "@/src/config/config";
import { TBanners } from "@/src/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";

interface OfferbannerProps {
  banners: TBanners[];
}

const Offerbanner: React.FC<OfferbannerProps> = ({ banners }) => {
  const offerBanners = banners
    .filter((banner) => banner.type === "offer")
    .slice(0, 2);

  if (!offerBanners.length) return null;

  const getImageUrl = (image?: string) => {
    if (!image) return "/placeholder.png";

    return image.startsWith("http")
      ? image
      : `${apiBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  return (
    <section className="Container mx-auto mt-10 space-y-6 px-4 sm:mt-14 sm:space-y-10">
      {offerBanners.map((banner, index) => {
        const reverse = index === 1;

        return (
          <motion.div
            key={banner._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`group relative grid min-h-[360px] overflow-hidden rounded-[20px] bg-[#F4F1EC] sm:min-h-[430px] lg:min-h-[490px] lg:grid-cols-2 lg:rounded-[28px] ${
              reverse ? "lg:[direction:rtl]" : ""
            }`}
          >
            {/* Text Side */}
            <div
              className={`relative z-10 flex items-center px-7 py-10 sm:px-12 lg:px-14 xl:px-20 ${
                reverse ? "lg:[direction:ltr]" : ""
              }`}
            >
              <div
                className={`max-w-md ${
                  reverse ? "lg:ml-auto" : ""
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D9D2C7] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#777064] sm:text-[10px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9C8060]" />
                  {banner.subtitle || "Special Collection"}
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.65 }}
                  className="mt-6 text-4xl font-medium leading-[1.12] tracking-[-0.045em] text-[#292820] sm:text-5xl lg:text-[54px] xl:text-[62px]"
                >
                  {banner.title}
                  <span className="ml-1 text-[#A38A6D]">.</span>
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: 65 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-7 h-[2px] bg-[#A38A6D]"
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-6 text-xs leading-6 tracking-wide text-[#77746C] sm:text-sm"
                >
                  Discover the pieces that define your style. Explore our
                  latest collection and find your next favorite.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    href="/shop"
                    className="group/btn inline-flex items-center gap-6 rounded-full bg-[#292820] py-3.5 pl-7 pr-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#A38A6D] sm:py-4 sm:pl-8 sm:pr-4 sm:text-xs"
                  >
                    Explore Collection
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#292820] transition-transform duration-300 group-hover/btn:rotate-45">
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>
                </motion.div>

                <p className="mt-8 text-[9px] font-medium uppercase tracking-[0.3em] text-[#AAA397]">
                  SOZA — STYLE THAT SPEAKS
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div
              className={`relative min-h-[260px] overflow-hidden sm:min-h-[350px] lg:min-h-full ${
                reverse ? "lg:[direction:ltr]" : ""
              }`}
            >
              <Image
                src={getImageUrl(banner.image)}
                alt={banner.title || "Soza fashion offer"}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
              />

              {/* Image Label */}
              <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
                <div className="flex h-[76px] w-[76px] rotate-6 flex-col items-center justify-center rounded-full border border-white/70 bg-white/80 text-center text-[#292820] shadow-sm backdrop-blur-md transition-transform duration-500 group-hover:rotate-0 sm:h-[92px] sm:w-[92px]">
                  <span className="text-[9px] font-medium uppercase tracking-wider">
                    Discover
                  </span>
                  <span className="mt-1 text-xs font-semibold tracking-widest">
                    SOZA
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default Offerbanner;
