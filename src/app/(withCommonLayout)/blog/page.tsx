
import BlogCard from "@/src/components/blog/BlogCard";
import { getAllBlogs } from "@/src/services/blogs";
import { TBlogs } from "@/src/types";
import PageSection from "@/src/utilits/PageSection";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const BlogsPage = async () => {
  const { data: blogs } = await getAllBlogs();

  return (
    <main className="bg-white">
      <PageSection second="Blogs" />

      <section className="Container py-12 lg:px-20 lg:py-16">
        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-gray-100 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
              The SOZA Journal
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#202020] sm:text-4xl">
              Latest Stories & Insights
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Explore the latest fashion trends, styling inspiration, and
              updates from SOZA.
            </p>
          </div>

          {blogs?.length > 0 && (
            <p className="text-sm font-medium text-gray-400">
              {blogs.length} {blogs.length === 1 ? "Article" : "Articles"}
            </p>
          )}
        </div>

        {/* Blog Grid */}
        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
            {blogs.map((blog: TBlogs) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#F7F7F5] px-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#087096]/10 text-[#087096]">
              <BookOpen size={28} strokeWidth={1.5} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#202020]">
              No articles available
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              We are working on new stories and fashion inspiration.
              Please check back soon.
            </p>

            <Link
              href="/shop"
              className="mt-6 rounded-md bg-[#087096] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#065873]"
            >
              Explore Collection
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogsPage;
