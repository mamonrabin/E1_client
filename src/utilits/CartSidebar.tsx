import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { X } from "lucide-react";

// import Image from "next/image";
import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";

const SideCartbar = ({ isSticky }) => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <p className="flex relative">
          <span>
            <IoBagOutline size={20} />
          </span>
          <span
            className={`w-4 h-4 absolute top-[-4px] right-[-6px] text-[12px]  flex items-center justify-center  rounded-full ${
              isSticky ? "bg-primary text-white" : "bg-white text-[#262626]"
            }`}
          >
            1
          </span>
        </p>
      </SheetTrigger>
      <SheetContent className="">
        <div className="px-4 pt-4 relative">
          <h2 className="text-xl capitalize font-medium text-primary">
            Shopping cart (1)
          </h2>
        </div>
        <SheetFooter className="px-4 py-4">
          <div className="flex items-center gap-2">
            <SheetClose asChild>
              <Link href="/checkout" className="flex-1">
                <div className="bg-[#262626] text-white text-center capitalize py-3 cursor-pointer">
                  check out
                </div>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/cart" className="flex-1">
                <div className=" border border-primary text-primary hover:bg-primary hover:text-white text-center capitalize py-3 cursor-pointer duration-300 transition-all">
                  view cart
                </div>
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>

        <SheetClose className="top-5 right-8 absolute ">
          <p className="cursor-pointer hover:rotate-45 duration-300">
            <X size={20} />
          </p>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SideCartbar;
