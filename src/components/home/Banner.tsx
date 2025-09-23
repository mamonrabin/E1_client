"use client";
import React, { useRef} from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TBanners } from "@/src/types";
import { apiBaseUrl } from "@/src/config/config";



// import { TBanners } from "@/src/types";



interface bannerProps {
  banners: TBanners[];
}


const Banner:React.FC<bannerProps > = ({banners}) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  

 
 const mainBanners = banners.filter(banner => banner.type === "main");

 

  return (
    <div className="relative mt-[-80px] ">
      {/* Custom Navigation Buttons */}
      <div className="absolute hidden lg:block top-1/2 lg:left-18 md:left-15 left-6 z-10 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer text-white text-2xl"
        >
          <SlArrowLeft />
        </button>
      </div>
      <div className="absolute hidden lg:block top-1/2 lg:right-18 md:right-15 right-6 z-10 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="text-white text-2xl cursor-pointer"
        >
          <SlArrowRight />
        </button>
      </div>

      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Navigation, Autoplay]}
        autoplay={false}
        onSwiper={(swiper) => (swiperRef.current = swiper as SwiperClass)}
        speed={1200}
      >
        {
          mainBanners?.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div
                className="w-full lg:h-[600px]  md:h-[500px] h-[300px] bg-center bg-cover bg-no-repeat Container relative"
                style={{backgroundImage: `url(${apiBaseUrl + banner.image})`,
}}
              >
                <div className="absolute inset-0 bg-black/40 rounded-b"></div>
                <div className="relative md:pt-0 pt-10 z-10 flex flex-col gap-4 justify-center h-full lg:px-20 text-white">
                  {/* Subtitle letter-by-letter */}
                  <div className="flex">
                   
                    <p  className="uppercase md:text-sm text-[12px] tracking-widest font-medium">{banner.subtitle}</p>
                  </div>

                  {/* Title */}
                  <h2
                    
                    className="text-white md:text-2xl text-base tracking-wider font-medium uppercase"
                  >
                    {banner.title}
                  </h2>


                  {/* Button */}
                  <button
                    
                    className="inline-flex capitalize items-center justify-center text-sm font-medium mt-6 w-30 border text-center py-2"
                  >
                    shop now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Banner;
