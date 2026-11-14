
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CopyRight = () => {
  return (
    <div className="border-t border-white/10 bg-[#087096]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-5 py-4 sm:flex-row md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[11px] text-white/80 sm:text-sm"
        >
          © {new Date().getFullYear()} SOZA. All rights reserved.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-[11px] text-white/80 sm:text-sm"
        >
          Designed & Developed by{" "}
          <Link
            href="https://titasweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-white/70"
          >
            Titasweb
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default CopyRight;
