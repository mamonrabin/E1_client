
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { menuList } from "@/src/utilits/menuList";
import { AlignJustify, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      {/* Menu Trigger */}
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5"
        >
          <AlignJustify
            size={22}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:scale-90"
          />
        </button>
      </SheetTrigger>

      {/* Navigation Drawer */}
      <SheetContent
        side="left"
        className="flex w-[85%] max-w-[360px] flex-col gap-0 border-r border-gray-100 bg-white p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-gray-900">
              Menu
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-400">
              Explore our collection
            </p>
          </div>

          <SheetClose asChild>
            <button
              aria-label="Close navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:rotate-90 hover:bg-black hover:text-white"
            >
              <X size={17} />
            </button>
          </SheetClose>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col">
            {menuList.map((item, index) => {
              const isActive = pathname === item.link;

              return (
                <motion.li
                  key={item.link}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                  }}
                  className="border-b border-gray-100"
                >
                  <SheetClose asChild>
                    <Link
                      href={item.link}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-center justify-between py-5 transition-all duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-gray-800 hover:pl-2 hover:text-primary"
                      }`}
                    >
                      <span className="relative text-[13px] font-semibold uppercase tracking-[0.14em]">
                        {item.title}

                        <span
                          className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${
                            isActive
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        />
                      </span>

                      <ArrowUpRight
                        size={16}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </SheetClose>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50/70 px-6 py-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
            Discover something new
          </p>

          <p className="mt-2 text-xs leading-6 text-gray-500">
            Explore our latest collections and find your perfect style.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
