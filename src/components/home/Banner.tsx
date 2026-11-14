"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";
import { TBanners } from "@/src/types";
import { apiBaseUrl } from "@/src/config/config";

// @ts-expect-error: Swiper CSS imports are handled by the bundler.
import "swiper/css";
// @ts-expect-error: Swiper CSS imports are handled by the bundler.
import "swiper/css/effect-fade";

interface BannerProps {
  banners: TBanners[];
}

const AUTOPLAY_DELAY = 5000;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: easeIn } },
};

const pad = (n: number) => String(n).padStart(2, "0");

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainBanners = banners?.filter((banner) => banner.type === "main") ?? [];
  if (!mainBanners.length) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="group/banner relative mt-[-80px] overflow-hidden"
    >
      <Swiper
        slidesPerView={1}
        loop
        speed={900}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectFade, Autoplay, Keyboard]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {mainBanners.map((banner, index) => {
          const isActive = activeIndex === index;
          return (
            <SwiperSlide key={banner._id}>
              <div className="relative h-[420px] w-full overflow-hidden md:h-[540px] lg:h-[660px]">
                {/* Background image with slow zoom */}
                <img
                  src={apiBaseUrl + banner.image}
                  alt={banner.title ?? "Banner"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform ease-out motion-reduce:transition-none ${
                    isActive
                      ? "scale-110 duration-[6000ms]"
                      : "scale-100 duration-0"
                  }`}
                />

                {/* Overlays: readable text on the left, soft fade at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 pt-16 md:px-12 lg:px-20">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={banner._id}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex max-w-xl flex-col items-start gap-4 text-white"
                      >
                        {banner.subtitle && (
                          <motion.p
                            variants={itemVariants}
                            className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md md:text-sm"
                          >
                            {banner.subtitle}
                          </motion.p>
                        )}

                        <motion.h2
                          variants={itemVariants}
                          className="text-3xl line-clamp-3 font-semibold leading-tight tracking-tight drop-shadow-sm md:text-5xl lg:text-6xl"
                        >
                          {banner.title}
                        </motion.h2>

                        <motion.button
                          variants={itemVariants}
                          whileTap={{ scale: 0.97 }}
                          className="group mt-4 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-sm font-semibold text-black shadow-lg transition-colors duration-300 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          Shop now
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                            <SlArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation arrows (glass style, appear on hover on desktop) */}
      {mainBanners.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white md:flex lg:left-10 lg:opacity-0 lg:group-hover/banner:opacity-100"
          >
            <SlArrowLeft />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white md:flex lg:right-10 lg:opacity-0 lg:group-hover/banner:opacity-100"
          >
            <SlArrowRight />
          </button>

          {/* Bottom bar: counter + progress dots */}
          <div className="absolute bottom-6 left-0 right-0 z-20 mx-auto flex max-w-[1400px] items-center gap-6 px-6 md:px-12 lg:px-20">
            <span className="text-sm font-medium tabular-nums text-white">
              {pad(activeIndex + 1)}
              <span className="text-white/50"> / {pad(mainBanners.length)}</span>
            </span>

            <div className="flex items-center gap-2">
              {mainBanners.map((banner, i) => (
                <button
                  key={banner._id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={activeIndex === i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`relative h-1 overflow-hidden rounded-full bg-white/30 transition-all duration-500 ${
                    activeIndex === i ? "w-12" : "w-6 hover:bg-white/60"
                  }`}
                >
                  {activeIndex === i && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Banner;