

import BlogsSlider from "@/src/slider/BlogsSlider";
import { TBlogs } from "@/src/types";
import React from "react";

interface blogsProps {
  blogs:TBlogs[]
}

const Blogs:React.FC<blogsProps> = ({blogs}) => {
  return (
    <div className="Container py-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl text-lg font-medium uppercase">our blogs</h2>
        <p className="font-medium capitalize border-primary/40 border-b cursor-pointer bounce-x-hover">
          View All
        </p>
      </div>

      <div className="mt-4">
        <BlogsSlider blogs={blogs} />
      </div>
    </div>
  );
};

export default Blogs;
