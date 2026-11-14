/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";

import logo from "@/src/assets/logo/logo-white.svg";
import logo2 from "@/src/assets/logo/logo-black.svg";
import SideNav from "./SideNav";
import { menuList } from "@/src/utilits/menuList";
import SearchBar from "@/src/utilits/SerachBar";
import SideCartbar from "@/src/utilits/CartSidebar";
import { getCurrentUser } from "@/src/utilits/CurrentUser";
import UserDropdown from "@/src/utilits/UserDropdown";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isSticky, setIsSticky] = useState(false); // solid white state
  const [isHidden, setIsHidden] = useState(false); // slide away when scrolling down
  const lastY = useRef(0);

  useEffect(() => {
    setUser(getCurrentUser());

    const handleScroll = () => {
      const y = window.scrollY;
      setIsSticky(y > 50);
      // hide on scroll down (after 300px), show on scroll up
      setIsHidden(y > lastY.current && y > 300);
      lastY.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isSticky ? "text-primary" : "text-white";

  return (
    // Placeholder keeps the same space in the page, so nothing jumps
    // when the header becomes fixed. Matches the banner's -80px overlap.
    <div className="relative h-20">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isSticky
            ? "border-b border-primary/10 bg-white/85 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-lg"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div
          className={`Container relative flex items-center justify-between xl:px-20 transition-all duration-500 ${
            isSticky ? "py-2" : "py-5"
          }`}
        >
          {/* Left: menu */}
          <nav aria-label="Main" className="flex items-center">
            <ul className={`hidden items-center xl:gap-8 gap-5 lg:flex ${textColor}`}>
              {menuList.map((item, index) => {
                const active =
                  item.link === "/" ? pathname === "/" : pathname?.startsWith(item.link);
                return (
                  <li key={index}>
                    <Link
                      href={item.link}
                      aria-current={active ? "page" : undefined}
                      className="group relative py-1 text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
                    >
                      {item.title}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                          isSticky ? "bg-primary" : "bg-white"
                        } ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className={`lg:hidden ${textColor}`}>
              <SideNav />
            </div>
          </nav>

          {/* Center: logo (truly centered, no negative margin hack) */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src={isSticky ? logo2 : logo}
              alt="Bagaholic logo"
              width={100}
              height={40}
              priority
              className={`h-auto transition-all duration-500 ${
                isSticky ? "w-[84px]" : "w-[100px]"
              }`}
            />
          </Link>

          {/* Right: actions */}
          <div className={`flex items-center gap-1 sm:gap-3 ${textColor}`}>
            <SearchBar />

            {user ? (
              <UserDropdown user={user} />
            ) : (
              <Link
                href="/signIn"
                className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 lg:flex ${
                  isSticky
                    ? "border-primary/20 hover:bg-primary hover:text-white"
                    : "border-white/40 hover:bg-white hover:text-black"
                }`}
              >
                <FaRegUser size={13} />
                <span>Login / Register</span>
              </Link>
            )}

            <SideCartbar isSticky={isSticky} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;