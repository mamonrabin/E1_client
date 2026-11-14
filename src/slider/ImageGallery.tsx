
"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { TProducts } from "../types";
import { apiBaseUrl } from "../config/config";

interface ProductProps {
  product: TProducts;
}

const ImageGallery: React.FC<ProductProps> = ({ product }) => {
  const { thumbal_image, backview_image, images = [] } = product;

  const groupImages = Array.from(
    new Set([thumbal_image, backview_image, ...images].filter(Boolean)),
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const zoomLevel = 2.5;
  const lensSize = 150;

  const getImageUrl = (img: string) => {
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    return `${apiBaseUrl}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const container = imgRefs.current[index];
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const safeX = Math.max(
      lensSize / 2,
      Math.min(x, rect.width - lensSize / 2),
    );

    const safeY = Math.max(
      lensSize / 2,
      Math.min(y, rect.height - lensSize / 2),
    );

    setLensPos({ x: safeX, y: safeY });
    setImgSize({ width: rect.width, height: rect.height });
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setLensPos(null);
  };

  const handleThumbnailClick = (index: number) => {
    mainSwiper?.slideTo(index);
    setActiveIndex(index);
    setLensPos(null);
  };

  if (!groupImages.length) return null;

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative flex justify-center">
        <div className="group relative w-full max-w-[350px] sm:max-w-[600px] overflow-hidden rounded-xl bg-gray-50">
          <Swiper
            modules={[Navigation, Thumbs]}
            onSwiper={setMainSwiper}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed
                  ? thumbsSwiper
                  : null,
            }}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {groupImages.map((img, index) => (
              <SwiperSlide key={`${img}-${index}`}>
                <div
                  ref={(el) => {
                    imgRefs.current[index] = el;
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => setLensPos(null)}
                 className="relative h-[380px] sm:h-[450px] lg:h-[500px] xl:h-[550px] border border-gray-100 overflow-hidden cursor-crosshair select-none bg-gray-50"
                >
                  <Image
                    src={getImageUrl(img)}
                    alt={`${product.title || "Product"} image ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 350px, (max-width: 1024px) 600px, 600px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    draggable={false}
                  />

                  {/* Zoom Lens */}
                  {lensPos && activeIndex === index && (
                    <div
                      className="absolute z-20 pointer-events-none rounded-full border-[3px] border-white shadow-[0_4px_25px_rgba(0,0,0,0.25)]"
                      style={{
                        width: `${lensSize}px`,
                        height: `${lensSize}px`,
                        left: lensPos.x - lensSize / 2,
                        top: lensPos.y - lensSize / 2,
                        backgroundImage: `url("${getImageUrl(img)}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                        backgroundPosition: `${
                          -(lensPos.x * zoomLevel - lensSize / 2)
                        }px ${
                          -(lensPos.y * zoomLevel - lensSize / 2)
                        }px`,
                      }}
                    />
                  )}

                  {/* Zoom Hint */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    <ZoomIn size={15} />
                    Hover to zoom
                  </div>

                  {/* Image Counter */}
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    {index + 1} / {groupImages.length}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="relative mt-4 lg:w-[100vh] w-[46vh] max-w-full mx-auto px-1">
        {/* Previous */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => thumbsSwiper?.slidePrev()}
          className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
        >
          <ChevronLeft size={19} />
        </button>

        {/* Next */}
        <button
          type="button"
          aria-label="Next image"
          onClick={() => thumbsSwiper?.slideNext()}
          className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
        >
          <ChevronRight size={19} />
        </button>

        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={10}
          watchSlidesProgress
          modules={[Navigation, Thumbs]}
          className="!px-11"
          breakpoints={{
            480: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 14,
            },
          }}
        >
          {groupImages.map((img, index) => (
            <SwiperSlide key={`thumb-${img}-${index}`}>
              <button
                type="button"
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View product image ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`relative block w-full overflow-hidden rounded-lg border-2 bg-gray-50 transition-all duration-300 ${
                  activeIndex === index
                    ? "border-black opacity-100 shadow-md"
                    : "border-transparent opacity-65 hover:opacity-100 hover:border-gray-300"
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`Product thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  sizes="100px"
                  className="aspect-square w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {activeIndex === index && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-black" />
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageGallery;
