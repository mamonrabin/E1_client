import { apiBaseUrl } from '@/src/config/config';
import { getBlogBySlug } from '@/src/services/blogs';
import Image from 'next/image';

import React from 'react';

interface slugProps {
  params: Promise<{
    blogSlug: string;
  }>;
}

const page = async ({ params }: slugProps) => {
 const resolvedParams = await params;
  const { data: blog } = await getBlogBySlug(resolvedParams.blogSlug);
  console.log("slug",blog)
    return (
        <div className="mt-[-80px]">
      <div className="w-full h-[60vh]">
        <Image
          src={apiBaseUrl + blog.image}
          alt="blog"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="Container xl:px-40 lg:px-34 md:px-20 sm:px-8 px-2  mt-[-60px] relative z-10">
        <div className="border bg-[#fff] p-6">
          <h2 className="md:text-lg text-base uppercase font-medium text-primary">
            {blog.title}
          </h2>
          <div className="text-sm flex items-center gap-4 py-2 text-gray-500">
            <p className="hover:text-secondary cursor-pointer duration-300">
              <span>Posted by:</span> <span>{blog.author.name}</span>
            </p>
            <p className="hover:text-secondary cursor-pointer duration-300">
              <span>Created Date:</span> <span>{new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}</span>
            </p>
          </div>

          <p className="text-sm text-gray-500 flex flex-col gap-2 py-4">
            {blog.description}
          </p>

          <div className="flex items-center gap-2 mt-8 py-4">
            <p className="text-base font-medium text-primary">Tags : </p>
            <ul className="flex items-center gap-1 text-sm">
  {blog?.tags?.map((tag: string, index: number) => (
    <li
      key={index}
      className="border px-2 py-1 rounded-[2px] border-primary/20 text-primary hover:bg-primary hover:text-white duration-300 cursor-pointer"
    >
      {tag}
    </li>
  ))}
</ul>
          </div>
        </div>
      </div>
    </div>
    );
};

export default page;