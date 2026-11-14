
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const AboutContent = () => {
  return (
    <main className="bg-white text-[#333333]">
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Page Heading */}
        <div className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
            About Us
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Us
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Updated November 13, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-10">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            Redefining Everyday Fashion
          </h2>

          <div className="space-y-5 text-[15px] leading-8 text-gray-600">
            <p>
              At SOZA, we believe fashion is more than just clothing — it is
              a way to express your personality, confidence, and individuality.
            </p>

            <p>
              Our goal is to bring you stylish, comfortable, and quality
              fashion that fits your everyday lifestyle. We carefully select
              our collections with attention to style, comfort, and value,
              making it easier for you to find clothing that suits your taste.
            </p>

            <p>
              From everyday essentials to modern styles, SOZA is here to make
              your online shopping experience simple, convenient, and enjoyable.
              We want you to feel confident in every choice you make.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-10 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Our Mission
          </h2>

          <p className="text-[15px] leading-8 text-gray-600">
            Our mission is to make everyday fashion accessible by offering
            stylish, comfortable, and valuable clothing choices. We aim to
            provide a convenient shopping experience, quality products, and
            friendly customer support while building lasting relationships
            with our customers through trust and care.
          </p>
        </div>

        {/* Vision */}
        <div className="mb-10 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Our Vision
          </h2>

          <p className="text-[15px] leading-8 text-gray-600">
            Our vision is to become a trusted online fashion destination
            where customers can discover clothing they love. We want SOZA
            to be known for its thoughtful collections, customer satisfaction,
            and commitment to making everyday shopping better.
          </p>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Get in Touch
          </h2>

          <p className="mb-6 text-[15px] leading-8 text-gray-600">
            Have a question about our products or need assistance with your
            order? We are always happy to help. Feel free to get in touch
            with our team.
          </p>

          <div className="space-y-4 text-sm text-gray-600">
            <Link
              href="/contact"
              className="flex w-fit items-center gap-3 transition hover:text-[#087096]"
            >
              <Mail size={18} className="text-[#087096]" />
              Contact our support team
              <ArrowRight size={15} />
            </Link>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#087096]" />
              Bangladesh
            </div>
          </div>
        </div>

        {/* Brand Signature */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm font-semibold tracking-wide text-[#087096]">
            SOZA — Wear Your Style. Feel Confident.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;
