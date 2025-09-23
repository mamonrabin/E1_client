"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { categoresiList } from "@/src/api/categoryApi";
import { TCategory } from "@/src/types";
import React from "react";
import { apiBaseUrl } from "@/src/config/config";

interface categoriesProps {
  categories:TCategory[]
}

const Categories:React.FC<categoriesProps> = ({categories}) => {
  return (
    <div className="py-2 cursor-grab">
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
          1536: { slidesPerView: 4 },
        }}
        modules={[Navigation]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1000}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id} className="overflow-hidden">
            <Image
              src={apiBaseUrl + category.image}
              alt=""
              width={500}
              height={500}
              className="relative hover:scale-105 duration-1000 transition-all overflow-hidden"
            />
            <div className="bottom-5 absolute px-2 w-full ">
              <button className="group cursor-pointer relative w-full py-3 text-center uppercase font-medium text-white  bg-white/30 overflow-hidden">
                <span className="relative z-10">{category.title}</span>

                {/* Black overlay */}
                <span className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
