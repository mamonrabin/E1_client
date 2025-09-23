import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="mt-1 cursor-pointer ">
        <p className="flex items-center gap-2 cursor-pointer uppercase lg:text-[13px] text-xl">
          <span>
            <Search size={18} />
          </span>{" "}
          <span className="lg:block hidden">Search</span>
        </p>
      </SheetTrigger>
      <SheetContent side="top" className="lg:px-60 py-8 ">
        <SheetHeader>
          <div className="">
            <h1 className="text-xl uppercase font-medium">
              What are you looking for?
            </h1>
          </div>
          <div className="flex items-center w-full mt-4 border-b border-[#262626]/40">
            <div className=" w-full ">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-lg py-2"
              />
            </div>
            <p>
              <Search size={20} />
            </p>
          </div>
        </SheetHeader>

        <SheetClose className="top-5 right-8 absolute ">
          <p className="w-6 h-6 flex items-center justify-center bg-white hover:bg-primary hover:text-white text-[#262626]/60 border border-[#262626]/20 rounded duration-300 cursor-pointer">
            <X size={20} />
          </p>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
