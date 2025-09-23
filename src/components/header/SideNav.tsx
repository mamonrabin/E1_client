import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuList } from "@/src/utilits/menuList";

import { AlignJustify, X } from "lucide-react";

import Link from "next/link";


const SideNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side="left" className="px-4 py-4">
        <ul className="flex flex-col gap-2 mt-4">
          {menuList.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="group relative uppercase text-sm tracking-wider font-medium"
              >
                {item.title}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        <SheetClose className="top-5 right-8 absolute ">
          <p className="w-6 h-6 flex items-center justify-center bg-white hover:bg-primary hover:text-white text-[#262626]/60 border border-[#262626]/20 rounded duration-300 cursor-pointer">
            <X size={20} />
          </p>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
