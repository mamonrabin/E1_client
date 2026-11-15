
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";



import "swiper/css";

import ProductCard from "../components/products/ProductCard";
import { TProducts } from "../types";

interface TrendingProps {
  products: TProducts[];
}

const ProductSlider: React.FC<TrendingProps> = ({ products }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  if (!products?.length) return null;

  const showArrows = products.length > 4;

  return (
    <div className="group/slider relative">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={12}
        speed={650}
        grabCursor
        watchOverflow
        loop={products.length > 4}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 22,
          },
        }}
        className="!pb-2"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product._id}
            className="h-auto"
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-[35%] z-20 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-md transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white lg:flex lg:opacity-0 lg:group-hover/slider:opacity-100"
          >
            <ChevronLeft size={21} />
          </button>

          <button
            type="button"
            aria-label="Next products"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-[35%] z-20 hidden h-11 w-11 translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-md transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white lg:flex lg:opacity-0 lg:group-hover/slider:opacity-100"
          >
            <ChevronRight size={21} />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductSlider;
