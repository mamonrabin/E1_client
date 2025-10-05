// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { TProducts } from "../types";
// import { apiBaseUrl } from "../config/config";

// interface productProps {
//   product: TProducts;
// }

// const ImageGallery: React.FC<productProps> = ({ product }) => {
//   const { thumbal_image, backview_image, images } = product;
//   const groupImages = [thumbal_image, backview_image, ...images];

//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [zoomStyle, setZoomStyle] = useState({});
//   const zoomRef = useRef<HTMLDivElement>(null);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setZoomStyle({
//       transformOrigin: `${x}% ${y}%`,
//       transform: "scale(2)", // zoom level
//     });
//   };

//   const handleMouseLeave = () => {
//     setZoomStyle({
//       transformOrigin: "center center",
//       transform: "scale(1)",
//     });
//   };

//   return (
//     <div>
//       {/* Main Image Swiper */}
//       <div className="relative flex justify-center">
//         <div className="w-full max-w-[350px] sm:max-w-[600px] overflow-hidden">
//           <Swiper
//             modules={[Navigation, Thumbs]}
//             thumbs={{ swiper: thumbsSwiper }}
//             onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//             className="w-full h-full"
//           >
//             {groupImages?.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   ref={zoomRef}
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative xl:h-[550px] lg:h-[500px] border overflow-hidden cursor-zoom-in"
//                 >
//                   <Image
//                     src={apiBaseUrl + img}
//                     alt={`img ${index}`}
//                     width={800}
//                     height={800}
//                     className="w-full h-full object-cover transition-transform duration-300 ease-out"
//                     style={index === activeIndex ? zoomStyle : { transform: "scale(1)" }}
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Thumbnail Swiper */}
//       <div className="relative mt-4">
//         {/* Left Arrow */}
//         <button
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
//           onClick={() => thumbsSwiper?.slidePrev()}
//         >
//           <ChevronLeft className="text-xl" />
//         </button>

//         {/* Right Arrow */}
//         <button
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
//           onClick={() => thumbsSwiper?.slideNext()}
//         >
//           <ChevronRight className="text-xl" />
//         </button>

//         <Swiper
//           onSwiper={setThumbsSwiper}
//           slidesPerView={4}
//           spaceBetween={10}
//           modules={[Navigation, Thumbs]}
//           className="px-12"
//         >
//           {groupImages?.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="cursor-pointer border rounded overflow-hidden hover:border-black">
//                 <Image
//                   src={apiBaseUrl + img}
//                   alt={`Thumbnail ${index}`}
//                   width={100}
//                   height={100}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;



/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  // ✅ store a separate ref for each image
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const zoomLevel = 2.5;
  const lensSize = 150;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const container = imgRefs.current[index];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const safeX = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
    const safeY = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

    setLensPos({ x: safeX, y: safeY });
    setImgSize({ width: rect.width, height: rect.height });
  };

  const handleMouseLeave = () => setLensPos(null);

  return (
    <div>
      {/* Main Image Swiper */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-[350px] sm:max-w-[600px] overflow-hidden">
          <Swiper
            modules={[Navigation, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full h-full"
          >
            {groupImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  ref={(el) => { imgRefs.current[index] = el; }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                  className="relative xl:h-[550px] lg:h-[500px] border overflow-hidden cursor-crosshair select-none"
                >
                  {/* Base Image */}
                  <Image
                    src={apiBaseUrl + img}
                    alt={`img ${index}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Circular Zoom Lens */}
                  {lensPos && activeIndex === index && (
                    <div
                      className="absolute pointer-events-none rounded-full border-2 border-gray-300 shadow-lg"
                      style={{
                        width: `${lensSize}px`,
                        height: `${lensSize}px`,
                        left: lensPos.x - lensSize / 2,
                        top: lensPos.y - lensSize / 2,
                        backgroundImage: `url(${apiBaseUrl + img})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                        backgroundPosition: `${
                          -(lensPos.x * zoomLevel - lensSize / 2)
                        }px ${-(lensPos.y * zoomLevel - lensSize / 2)}px`,
                        transition: "background-position 0.05s ease-out",
                      }}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Thumbnail Swiper */}
      <div className="relative mt-4 lg:w-[100vh] w-[46vh]">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
          onClick={() => thumbsSwiper?.slidePrev()}
        >
          <ChevronLeft className="text-xl" />
        </button>

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
