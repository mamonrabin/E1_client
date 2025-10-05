import { apiBaseUrl } from "@/src/config/config";
import { TBlogs } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface blogProps {
  blog: TBlogs;
}

const BlogCard: React.FC<blogProps> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="group overflow-hidden cursor-pointer">
        <div className="overflow-hidden relative w-full lg:h-[280px]">
          <Image
            src={apiBaseUrl + blog.image}
            alt="image"
            width={300}
            height={300}
            className="w-full h-full group-hover:scale-110 duration-700 overflow-hidden"
          />

          {/* <div className="top-5 left-5 absolute">
            {blog.label && (
              <p className="uppercase text-sm px-4 py-2 bg-white text-primary font-medium tracking-wider">
                {blog.label}
              </p>
            )}
          </div> */}
        </div>

        <div className="mt-4 flex flex-col gap-2 px-2">
          {/* <p className="text-sm text-primary/80">
  {new Date(blog.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</p> */}

          <p className="text-sm text-primary/80">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="line-clamp-1 text-xl font-semibold">{blog.title}</h2>
          <p className="line-clamp-2 text-sm text-primary/80">
            {blog.description}
          </p>

          <button className="inline-flex border border-primary px-6 py-3 w-32 capitalize mt-4 cursor-pointer hover:bg-primary hover:text-white duration-500">
            Read more
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
