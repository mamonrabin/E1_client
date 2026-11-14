
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  ArrowUpRight,
  Send,
} from "lucide-react";

import logo from "@/src/assets/logo/logo-white.svg";

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shop", href: "/shop" },
  { name: "Blogs", href: "/blogs" },
  { name: "Our Store", href: "/store" },
  { name: "FAQ", href: "/faq" },
];

const policyLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Order Policy", href: "/order-policy" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-[#202020] text-white">
      <div className="container mx-auto px-5 pt-14 pb-8 md:px-8 md:pt-16">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="Soza"
                width={110}
                height={55}
                className="h-auto w-[100px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
              Discover timeless styles and everyday essentials. We bring
              together quality, comfort, and contemporary fashion.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="https://maps.google.com/?q=Mirpur-1,Dhaka-1206,Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-white"
              >
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#087096]" />
                <span>Mirpur-1, Dhaka-1206, Bangladesh</span>
              </a>

              <a
                href="tel:+8801746770324"
                className="group flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Phone size={17} className="shrink-0 text-[#087096]" />
                <span>+8801746770324</span>
              </a>

              <a
                href="mailto:almamon757@gmail.com"
                className="group flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Mail size={17} className="shrink-0 text-[#087096]" />
                <span className="break-all">almamon757@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Our Company
            </h3>

            <div className="mt-2 h-[2px] w-8 bg-[#087096]" />

            <ul className="mt-6 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Customer Care
            </h3>

            <div className="mt-2 h-[2px] w-8 bg-[#087096]" />

            <ul className="mt-6 space-y-3">
              {policyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Stay In The Loop
            </h3>

            <div className="mt-2 h-[2px] w-8 bg-[#087096]" />

            <p className="mt-6 text-sm leading-7 text-white/55">
              Get updates on new arrivals, exclusive offers, and the latest
              collections.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex border-b border-white/30 transition-colors focus-within:border-[#087096]"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-3 text-[#087096] transition-colors hover:text-white"
              >
                <Send size={19} />
              </button>
            </form>

            <p className="mt-3 text-xs text-white/35">
              Be the first to know about our latest collections.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors duration-300 hover:border-[#087096] hover:bg-[#087096] hover:text-white"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom footer */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} SOZA. All rights reserved.
            </p>

            <p className="text-xs text-white/40">
              Designed for everyday style.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
