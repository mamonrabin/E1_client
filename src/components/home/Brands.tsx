"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";

import { apiBaseUrl } from "@/src/config/config";
import { TBrand } from "@/src/types";
import React from "react";

interface brandProps {
  brands:TBrand[]
}

const Brands:React.FC<brandProps> = ({brands}) => {
  return (
    <div className="Container py-20 cursor-grab">
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 6 },
          1536: { slidesPerView: 6 },
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1000}
      >
        {brands?.map((brand) => (
          <SwiperSlide
            key={brand._id}
            className="overflow-hidden lg:px-20 px-10"
          >
            <div className="md:w-[80px] w-[90px] md:h-[30px] h-[30px] flex items-center justify-center">
              <Image
                src={apiBaseUrl + brand.image}
                alt=""
                width={120}
                height={120}
                className="w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
