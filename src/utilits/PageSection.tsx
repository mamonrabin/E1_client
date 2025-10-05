import React from "react";
import image from "@/src/assets/images/pageSection.webp";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
interface Props {
  second: string;
  third?: string;
}
const PageSection: React.FC<Props> = ({ second, third }) => {
  return (
    <div
      className={`relative mt-[-80px] bg-cover bg-center flex items-center justify-center gap-2 lg:py-40 md:py-30 py-20 text-white capitalize `}
      style={{ backgroundImage: `url(${image.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative top-3 z-10 flex items-center gap-2 md:text-lg">
        <Link href="/">
          <h1 className="hover:text-secondary duration-300 cursor-pointer">
            home
          </h1>
        </Link>
        <p>
          <ChevronRight />
        </p>
        <p className="">{second}</p>
        <p className="">{third}</p>
      </div>
    </div>
  );
};

export default PageSection;
