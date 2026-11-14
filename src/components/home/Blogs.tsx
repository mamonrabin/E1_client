import BlogsSlider from "@/src/slider/BlogsSlider";
import { TBlogs } from "@/src/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface blogsProps {
  blogs: TBlogs[];
}

const Blogs: React.FC<blogsProps> = ({ blogs }) => {
  return (
    <div className="Container py-4 mt-4">
      <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[2px] w-7 bg-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              blogs
            </p>
          </div>

          <h2 className="text-2xl font-semibold uppercase tracking-tight text-gray-900 sm:text-3xl">
            our blogs
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            browse our latest blogs and articles to stay updated with the latest
            trends, tips, and insights in the industry.
          </p>
        </div>

        <Link
          href="/blog"
          className="group mb-1 flex shrink-0 items-center gap-2 border-b border-gray-300 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-800 transition-colors hover:border-primary hover:text-primary sm:text-xs"
        >
          View All
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="mt-4">
        <BlogsSlider blogs={blogs} />
      </div>
    </div>
  );
};

export default Blogs;
