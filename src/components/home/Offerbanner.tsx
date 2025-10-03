
import { apiBaseUrl } from "@/src/config/config";
import { TBanners } from "@/src/types";
import Image from "next/image";
import React from "react";

interface OfferbannerProps {
  banners: TBanners[];
}

const Offerbanner:React.FC<OfferbannerProps> = ({banners}) => {
   const offerBanners = banners.filter(banner => banner.type === "offer");
  return (
    <div className="Container mt-6 flex flex-col gap-2">
      <div>
        {offerBanners?.slice(0, 1).map((banner) => (
            <div key={banner._id} className="relative">
              <div className="md:h-[440px] h-[200px]">
                <Image
                  src={apiBaseUrl + banner.image}
                  alt="offer"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute xl:top-30 lg:top-20 top-12  md:px-20 px-4 z-10 text-white flex flex-col md:gap-6 gap-2">
                <p className="md:text-sm text-[10px] uppercase font-medium tracking-[6px]">
                  {banner.subtitle}
                </p>
                <h2 className="lg:text-3xl md:text-xl text-base font-medium md:uppercase line-clamp-2">
                  {banner.title}
                </h2>
                <button className="group cursor-pointer relative   md:py-2 py-1 md:w-30 w-20 border border-white hover:border-transparent duration-300 text-center capitalize font-medium text-white  overflow-hidden">
                  <span className="relative z-10 md:text-sm text-[10px]">
                    shop now
                  </span>

                  {/* Black overlay */}
                  <span className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div>
        {offerBanners?.slice(1, 2).map((banner) => (
            <div key={banner._id} className="relative">
              <div className="md:h-[440px] h-[200px]">
                <Image
                  src={apiBaseUrl + banner.image}
                  alt="offer"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute right-0 xl:top-30 lg:top-20 top-12  md:px-20 px-4 z-10 text-white flex flex-col items-end md:gap-6 gap-2">
                <p className="md:text-sm text-[10px] uppercase font-medium tracking-[6px]">
                  {banner.subtitle}
                </p>
                <h2 className="lg:text-3xl md:text-xl text-base font-medium md:uppercase line-clamp-2">
                  {banner.title}
                </h2>
                <button className="group cursor-pointer relative   md:py-2 py-1 md:w-30 w-20 border border-white hover:border-transparent duration-300 text-center capitalize font-medium text-white  overflow-hidden">
                  <span className="relative z-10 md:text-sm text-[10px]">
                    shop now
                  </span>

                  {/* Black overlay */}
                  <span className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Offerbanner;
