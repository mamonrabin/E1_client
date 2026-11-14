
"use client";

import { apiBaseUrl } from "@/src/config/config";
import { TBlogs } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface BlogProps {
  blog: TBlogs;
  index?: number;
}

const BlogCard: React.FC<BlogProps> = ({ blog, index = 0 }) => {
  const imageUrl = blog.image?.startsWith("http")
    ? blog.image
    : `${apiBaseUrl}${blog.image?.startsWith("/") ? "" : "/"}${blog.image || ""}`;

  const date = blog.createdAt ? new Date(blog.createdAt) : null;

  const day = date
    ? date.toLocaleDateString("en-US", { day: "2-digit" })
    : "";

  const month = date
    ? date.toLocaleDateString("en-US", { month: "short" })
    : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
    >
      <Link
        href={`/blog/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-[5px] bg-[#252525]"
      >
        {/* Background image */}
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={blog.title || "Fashion blog"}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 opacity-90" />

        {/* Top section */}
        <div className="absolute left-5 right-5 top-5 flex items-right justify-between sm:left-6 sm:right-6 sm:top-6">
          {/* {blog.label ? (
            <span className="border border-white/40 bg-white/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {blog.label}
            </span>
          ) : (
            <span />
          )} */}

          {/* Date block */}
          <div className="flex h-[58px] w-[52px] flex-col items-center justify-center bg-white text-gray-900 transition-transform duration-500 group-hover:-translate-y-1">
            <span className="text-xl font-semibold leading-none">{day}</span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-widest">
              {month}
            </span>
          </div>
        </div>

        {/* Vertical editorial text */}
        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-180 sm:block">
          <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/70 [writing-mode:vertical-rl]">
            THE SOZA JOURNAL
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <motion.div
            initial={false}
            className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0"
          >
            <p className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/65">
              <span className="h-px w-6 bg-white/70" />
              Fashion & Lifestyle
            </p>

            <h3 className="line-clamp-2 max-w-[90%] text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
              {blog.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/65 sm:text-sm">
              {blog.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-white/25 pt-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white">
                Explore article
              </span>

              <motion.span
                whileHover={{ rotate: 45 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-gray-900"
              >
                <ArrowUpRight size={19} />
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Animated border */}
        <div className="pointer-events-none absolute inset-3 border border-white/0 transition-all duration-700 group-hover:inset-4 group-hover:border-white/30" />
      </Link>
    </motion.article>
  );
};

export default BlogCard;
