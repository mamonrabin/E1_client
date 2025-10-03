"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TBanners } from "@/src/types";
import { apiBaseUrl } from "@/src/config/config";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";

interface bannerProps {
  banners: TBanners[];
}

const Banner: React.FC<bannerProps> = ({ banners }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainBanners = banners.filter((banner) => banner.type === "main");

  // Container for stagger
 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: -70,
    transition: { duration: 0.4, ease: easeIn },
  },
};

  // Each item
  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.7, ease: "easeOut" },
  //   },
  //   exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } },
  // };




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
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        speed={1200}
      >
        {mainBanners?.map((banner, index) => (
          <SwiperSlide key={banner._id}>
            <div
              className="w-full lg:h-[600px] md:h-[500px] h-[300px] bg-center bg-cover bg-no-repeat Container relative"
              style={{ backgroundImage: `url(${apiBaseUrl + banner.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-b"></div>

              <div className="relative md:pt-0 pt-10 z-10 flex flex-col gap-4 justify-center h-full lg:px-20 text-white">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={banner._id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={containerVariants}
                      className="flex flex-col gap-4"
                    >
                      {/* Subtitle */}
                      <motion.p
                        variants={itemVariants}
                        className="uppercase md:text-sm text-[12px] tracking-widest font-medium"
                      >
                        {banner.subtitle}
                      </motion.p>
 
                      {/* Title */}
                      <motion.h2
                        variants={itemVariants}
                        className="text-white md:text-2xl text-base tracking-wider font-medium uppercase"
                      >
                        {banner.title}
                      </motion.h2>

                      {/* Button */}
                      <motion.button
                        variants={itemVariants}
                        className="inline-flex capitalize items-center relative group 
                          justify-center text-sm font-medium mt-6 w-30 border text-center py-2 cursor-pointer overflow-hidden 
                          hover:border-transparent duration-300"
                      >
                        <span className="relative z-10">shop now</span>
                        <span className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
