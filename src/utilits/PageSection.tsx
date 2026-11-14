
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

import image from "@/src/assets/images/pageSection.webp";

interface Props {
  second: string;
  third?: string;
}

const PageSection: React.FC<Props> = ({ second, third }) => {
  return (
    <section className="group relative isolate mt-[-80px] flex min-h-[240px] items-center justify-center overflow-hidden bg-gray-950 pt-16 sm:min-h-[300px] lg:min-h-[360px]">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={image}
          alt="Fashion collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/55" />

      {/* Decorative Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

      {/* Content */}
      <div className="Container relative z-10 flex flex-col items-center px-4 py-12 text-center text-white">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/70" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-[10px]">
            Discover Our Collection
          </span>

          <span className="h-px w-8 bg-white/70" />
        </motion.div>

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.35,
            ease: "easeOut",
          }}
          className="max-w-3xl text-3xl font-semibold capitalize tracking-tight sm:text-4xl lg:text-5xl"
        >
          {second}
        </motion.h1>

        {third && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-3 text-sm text-white/70"
          >
            {third}
          </motion.p>
        )}

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex max-w-full items-center gap-2 text-xs font-medium sm:text-sm"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-white"
          >
            <Home size={14} />
            Home
          </Link>

          <ChevronRight size={14} className="shrink-0 text-white/50" />

          <span className="max-w-[200px] truncate text-white sm:max-w-sm">
            {second}
          </span>

          {third && (
            <>
              <ChevronRight
                size={14}
                className="shrink-0 text-white/50"
              />
              <span className="truncate text-white/70">{third}</span>
            </>
          )}
        </motion.nav>
      </div>

      {/* Bottom Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
    </section>
  );
};

export default PageSection;
