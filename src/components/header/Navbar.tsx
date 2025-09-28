/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/src/assets/logo/logo-white.svg";
import logo2 from "@/src/assets/logo/logo-black.svg";
import Image from "next/image";

import { FaRegUser } from "react-icons/fa";

import SideNav from "./SideNav";
import { menuList } from "@/src/utilits/menuList";
import SearchBar from "@/src/utilits/SerachBar";
import SideCartbar from "@/src/utilits/CartSidebar";

import { getCurrentUser } from "@/src/utilits/CurrentUser";
import UserDropdown from "@/src/utilits/UserDropdown";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser(); // get from localStorage/JWT decode
    setUser(currentUser);

    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`Container xl:px-20 z-10 py-6 ${
        isSticky
          ? "fixed top-0 bg-white shadow-md py-2 z-50 w-full border-b border-primary/10"
          : "relative"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Menu */}
        <div>
          <ul
            className={`lg:flex hidden xl:gap-6 gap-4 ${
              isSticky ? "text-primary" : "text-white"
            }`}
          >
            {menuList.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="group relative uppercase text-sm tracking-wider font-medium"
                >
                  {item.title}
                  <span
                    className={`absolute left-0 -bottom-1 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                      isSticky ? "bg-primary" : "bg-white"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
          <p
            className={`lg:hidden cursor-pointer ${
              isSticky ? "text-primary" : "text-white"
            }`}
          >
            <SideNav />
          </p>
        </div>

        {/* Logo */}
        <div className="lg:ml-[-80px]">
          {isSticky ? (
            <Image src={logo2} alt="logo" width={100} height={100} />
          ) : (
            <Image src={logo} alt="logo" width={100} height={100} />
          )}
        </div>

        {/* Right Menu */}
        <div
          className={`flex items-center lg:gap-6 gap-2 text-[13px] uppercase font-medium ${
            isSticky ? "text-primary" : "text-white"
          }`}
        >
          <SearchBar />

          {/* ✅ Show user if logged in, otherwise show Login/Register */}
          {user ? (
            
            <UserDropdown user={user}/>
          ) : (
            <Link href="/signIn">
              <p className="lg:flex hidden items-center gap-2 cursor-pointer">
                <span>
                  <FaRegUser size={16} />
                </span>
                <span>Login / Register</span>
              </p>
            </Link>
          )}

          <SideCartbar isSticky={isSticky} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
