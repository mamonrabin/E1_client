"use client";
import React, { useState } from "react";
// import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/logo/logo-white.svg";
import { ChevronLeft } from "lucide-react";
import Menu from "./Menu";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`relative bg-primary p-4 transition-all duration-300  ${
        isCollapsed ? "w-[90px]" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="top-4 sticky z-50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`bg-white p-1 transition-all duration-300 ${
            isCollapsed ? "ml-14" : "ml-56"
          }   font-semibold border border-[#262626]/40 shadow rounded inline-flex cursor-pointer`}
        >
          <ChevronLeft
            size={20}
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Logo */}
      <div
        className={` top-0  fixed transition-all duration-300 ${
          isCollapsed ? "bg-primary w-[60px]" : "w-[240px] h-[100px] bg-primary"
        } flex items-center justify-center`}
      >
        <div
          className={`mx-auto mt-2  z-50    ${
            isCollapsed ? "w-[60px] h-[60px] " : "w-[120px] h-[120px]"
          }`}
        >
          <Link href="/">
            <Image
              src={logo}
              alt="Brand Logo"
              width={150}
              height={150}
              className="w-full h-full"
            />
          </Link>
        </div>
      </div>

      {/* Menu */}
      <Menu isCollapsed={isCollapsed} />
    </div>
  );
};

export default SideBar;
