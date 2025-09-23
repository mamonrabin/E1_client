"use client";
import React, { useRef } from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { useWindowSize } from "../hooks/useWindowSize";
import BlogCard from "../components/blog/BlogCard";
import { TBlogs } from "../types";

interface blogsliderProps {
  blogs:TBlogs[]
}

const BlogsSlider:React.FC<blogsliderProps> = ({ blogs }) => {
  const windowWidth = useWindowSize();
  const swiperRef = useRef<SwiperClass | null>(null);

  const showCustomArrows =
    (windowWidth >= 1024 && blogs?.length > 4) ||
    (windowWidth < 1024 && blogs?.length > 3);
  return (
    <div className="relative">
      {showCustomArrows && (
        <>
          <div className="absolute hidden lg:block top-2/5  left-6 z-10 transform -translate-y-1/2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer text-primary text-2xl"
            >
              <SlArrowLeft />
            </button>
          </div>
          <div className="absolute hidden lg:block top-2/5   right-6 z-10 transform -translate-y-1/2">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="text-primary text-2xl cursor-pointer"
            >
              <SlArrowRight />
            </button>
          </div>
        </>
      )}

      <Swiper
        spaceBetween={8}
        slidesPerView={1.5}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          700: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
        modules={[Navigation, Pagination]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper as SwiperClass)}
        pagination={{ el: ".custom-pagination", clickable: true }}
        speed={1000}
      >
        {blogs?.map((blog) => (
          <SwiperSlide key={blog._id} className="lg:cursor-pointer cursor-grab">
            <BlogCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="custom-pagination flex justify-center gap-2 lg:hidden"></div> */}
    </div>
  );
};

export default BlogsSlider;
