/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TProducts } from "../types";
import { apiBaseUrl } from "../config/config";

interface productProps {
  product: TProducts;
}

const ImageGallery: React.FC<productProps> = ({ product }) => {
  const { thumbal_image, backview_image, images } = product;
  const groupImages = [thumbal_image, backview_image, ...images];

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div>
      {/* Main Image Swiper */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-[350px] sm:max-w-[600px] overflow-hidden">
          <Swiper
            modules={[Navigation, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-full"
          >
            {groupImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative xl:h-[550px] lg:h-[500px] border">
                  <Image
                    src={apiBaseUrl + img}
                    alt={`img ${index}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Thumbnail Swiper */}
      <div className="relative mt-4">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 "
          onClick={() => thumbsSwiper?.slidePrev()}
        >
          <ChevronLeft className="text-xl" />
        </button>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
          onClick={() => thumbsSwiper?.slideNext()}
        >
          <ChevronRight className="text-xl" />
        </button>

        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={10}
          modules={[Navigation, Thumbs]}
          className="px-12"
        >
          {groupImages?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="cursor-pointer border rounded overflow-hidden hover:border-black">
                <Image
                  src={apiBaseUrl + img}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageGallery;
