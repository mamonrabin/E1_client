import React from "react";
import logo from "@/src/assets/logo/logo-white.svg";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  MailPlus,
  MapPinHouse,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-[#262626] py-12 Container">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-2 gap-4">
        <div className="">
          <Image src={logo} alt="Logo" width={100} height={100} />
          <div className="text-white/80 mt-6">
            <p className="text-sm">
              Mixtax nec nisl a purus blandit viverra. Pellentesque habitant
              morbi tristique senectuse.
            </p>

            <div className="flex flex-col gap-2 mt-4">
              <p className="flex items-center gap-2 text-sm">
                <span>
                  <MapPinHouse size={16} />
                </span>{" "}
                <span>Mirpur-1,Dhaka-1206,Bangladesh</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <span>
                  <Phone size={16} />
                </span>{" "}
                <span>+8801746770324</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <span>
                  <MailPlus size={16} />
                </span>{" "}
                <span>almamon757@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
        <div className="md:ml-16">
          <h2 className="text-white text-base">Our Company</h2>

          <ul className="text-white/60 mt-4 flex flex-col gap-2 cursor-pointer text-sm">
            <Link href="/about">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                About Us
              </li>
            </Link>
            <Link href="/contact">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Contact Us
              </li>
            </Link>
            <Link href="/product">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Shop
              </li>
            </Link>
            <Link href="/blogs">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Blogs
              </li>
            </Link>
            <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
              Our Store
            </li>
            <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
              FAQ
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-base">Quick links</h2>

          <ul className="text-white/60 mt-4 flex flex-col gap-2 cursor-pointer text-sm">
            <Link href="privacy-policy">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Privacy Policy
              </li>
            </Link>
            <Link href="/terms-conditions">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Terms & Conditions
              </li>
            </Link>
            <Link href="/return-policy">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Return Policy
              </li>
            </Link>
            <Link href="/order-policy">
              <li className="hover:ml-2 hover:text-white duration-300 cursor-pointer">
                Order Policy
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-base">Sign Up to Newsletter</h2>

          <div className="mt-4">
            <p className="text-sm text-white/60">
              Subscribe for store updates and discounts.
            </p>

            <form className="mt-4">
              <input
                className="border border-white/60 px-4 py-3 text-white outline-none text-sm w-full"
                type="text"
                placeholder="Your Email.."
              />

              <input
                className="px-4 py-3 border border-white/20  hover:bg-secondary duration-300 cursor-pointer bg-primary text-white text-sm mt-2"
                type="submit"
                value="Subscribers"
              />
            </form>

            <div className="flex items-center gap-2 mt-4">
              <p className="p-1.5 border border-white/40  text-white/60 hover:text-white duration-300 cursor-pointer">
                <Facebook size={16} />
              </p>
              <p className="p-1.5 border border-white/40  text-white/60 hover:text-white duration-300 cursor-pointer">
                <Instagram size={16} />
              </p>
              <p className="p-1.5 border border-white/40  text-white/60 hover:text-white duration-300 cursor-pointer">
                <Twitter size={16} />
              </p>
              <p className="p-1.5 border border-white/40  text-white/60 hover:text-white duration-300 cursor-pointer">
                <Youtube size={16} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
