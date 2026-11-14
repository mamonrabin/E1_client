
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


import Image from "next/image";
import { useRouter } from "next/navigation";
import { TCategory } from "@/src/types";
import React from "react";
import { apiBaseUrl } from "@/src/config/config";
import { motion } from "framer-motion";
import { ArrowUpRight} from "lucide-react";

interface CategoriesProps {
  categories: TCategory[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/shop?category=${categoryId}`);
  };

  if (!categories?.length) return null;

  return (
    <section className="relative py-5 sm:py-8 overflow-hidden cursor-pointer">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        spaceBetween={16}
        slidesPerView={1.5}
        speed={700}
        grabCursor
        watchOverflow
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 14 },
          640: { slidesPerView: 2.5, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 22 },
        }}
        className="!overflow-visible"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category._id}>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (index % 4) * 0.08,
              }}
              onClick={() => handleCategoryClick(category._id)}
              aria-label={`Explore ${category.title} category`}
              className="group relative block w-full overflow-hidden rounded-lg bg-gray-100 text-left"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer">
                <Image
                  src={apiBaseUrl + category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 480px) 65vw, (max-width: 768px) 45vw, (max-width: 1280px) 30vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top Label */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    Collection
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold uppercase tracking-wide text-white sm:text-xl">
                        {category.title}
                      </h3>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/70 transition-all duration-300 group-hover:translate-x-1">
                        Explore collection
                      </p>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-4 h-[2px] w-full overflow-hidden bg-white/30">
                    <div className="h-full w-0 bg-white transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </motion.button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      {/* {categories.length > 1 && (
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="Previous categories"
            className="category-prev flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            aria-label="Next categories"
            className="category-next flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      )} */}
    </section>
  );
};

export default Categories;
