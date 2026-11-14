
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useWindowSize } from "../hooks/useWindowSize";
import BlogCard from "../components/blog/BlogCard";
import { TBlogs } from "../types";

interface BlogSliderProps {
  blogs: TBlogs[];
}

const BlogsSlider: React.FC<BlogSliderProps> = ({ blogs }) => {
  const windowWidth = useWindowSize();
  const swiperRef = useRef<SwiperClass | null>(null);

  if (!blogs?.length) return null;

  const showCustomArrows =
    windowWidth >= 1024 ? blogs.length > 3 : false;

  return (
    <div className="relative">
      {/* Custom navigation */}
      {showCustomArrows && (
        <>
          <button
            type="button"
            aria-label="Previous articles"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-5 top-[38%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white lg:flex"
          >
            <SlArrowLeft size={17} />
          </button>

          <button
            type="button"
            aria-label="Next articles"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-5 top-[38%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white lg:flex"
          >
            <SlArrowRight size={17} />
          </button>
        </>
      )}

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={18}
        slidesPerView={1.15}
        loop={blogs.length > 3}
        speed={850}
        autoplay={
          blogs.length > 3
            ? {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        grabCursor
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.7,
            spaceBetween: 18,
          },
          640: {
            slidesPerView: 1.7,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
        }}
        className="blogs-swiper !pb-5"
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={blog._id} className="h-auto">
            <BlogCard blog={blog} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogsSlider;
