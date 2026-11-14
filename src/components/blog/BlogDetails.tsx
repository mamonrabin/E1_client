
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UserRound,
  BookOpen,
} from "lucide-react";
import { TBlogs } from "@/src/types";

interface BlogDetailsProps {
  blog: TBlogs;
  imageUrl: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({
  blog,
  imageUrl,
}) => {
  const reduceMotion = useReducedMotion();

  const animation = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut" as const,
      },
    },
  };

  const createdDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const authorName = blog.author?.name || "SOZA Team";

  return (
    <article className="pb-20">
      {/* Hero Image */}
      <section className="relative h-[350px]  bg-[#F7F7F5] sm:h-[450px] lg:h-[570px]">
        <motion.div
          initial={{ scale: reduceMotion ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrl}
            alt={blog.title || "SOZA blog"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />

        <div className="absolute bottom-7 left-5 right-5 sm:bottom-12 sm:left-10 lg:left-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animation}
            className="mx-auto max-w-7xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <BookOpen size={14} />
              The SOZA Journal
            </span>

            <p className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {blog.title}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:-mt-16 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={animation}
          className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_15px_60px_rgba(0,0,0,0.06)] sm:p-10 lg:p-14"
        >
          {/* Back Link */}
          <Link
            href="/blogs"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#087096]"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Blogs
          </Link>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-gray-100 pb-7 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#087096]/10 text-[#087096]">
                <UserRound size={15} />
              </span>
              <span>{authorName}</span>
            </div>

            {createdDate && (
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#087096]" />
                <span>{createdDate}</span>
              </div>
            )}
          </div>

          {/* Article Title */}
          <motion.h1
            variants={animation}
            className="mt-8 text-2xl font-bold leading-tight tracking-tight text-[#202020] sm:text-4xl"
          >
            {blog.title}
          </motion.h1>

          {/* Description */}
          <div className="mt-7 whitespace-pre-line text-[15px] leading-8 text-gray-600 sm:text-base sm:leading-9">
            {blog.description}
          </div>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="mt-12 border-t border-gray-100 pt-7">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#202020]">
                Topics covered
              </h3>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, index: number) => (
                  <motion.span
                    key={`${tag}-${index}`}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    className="rounded-md border border-[#087096]/15 bg-[#087096]/5 px-4 py-2 text-sm text-[#087096] transition hover:bg-[#087096] hover:text-white"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 flex flex-col justify-between gap-5 border-t border-gray-100 pt-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
                Thanks for reading
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Stay inspired. Stay stylish. Stay SOZA.
              </p>
            </div>

            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#087096] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#065873]"
            >
              Explore Collection
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </article>
  );
};

export default BlogDetails;
