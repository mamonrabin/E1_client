
"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c69b5b]/[0.06] blur-[100px]" />

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Animated Logo */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center">

          <div className="absolute inset-0 rounded-full border border-[#c69b5b]/20" />

          <div className="absolute inset-0 animate-spin rounded-full border-[2px] border-transparent border-t-[#d6ad70] [animation-duration:2s]" />

          <div className="absolute inset-3 animate-spin rounded-full border border-transparent border-b-white/40 [animation-duration:3s] [animation-direction:reverse]" />

          <span className="font-serif text-6xl font-light tracking-tight text-white">
            S
          </span>

          {/* Golden Dot */}
          <span className="absolute right-5 top-5 h-2 w-2 animate-pulse rounded-full bg-[#d6ad70] shadow-[0_0_15px_#d6ad70]" />
        </div>

        {/* Brand Name */}
        <h1 className="animate-pulse font-serif text-4xl font-light tracking-[0.45em] text-white">
          SOZA
        </h1>

        {/* Tagline */}
        <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.45em] text-[#b69a72]">
          Fashion Beyond Limits
        </p>

        {/* Progress Bar */}
        <div className="mt-12 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-[#d6ad70] to-white shadow-[0_0_12px_#d6ad70]" />
        </div>

        {/* Loading Text */}
        <p className="mt-5 animate-pulse text-[10px] uppercase tracking-[0.4em] text-white/50">
          Loading Collection
        </p>

      </div>

      {/* Bottom Brand */}
      <div className="absolute bottom-8 text-[9px] uppercase tracking-[0.4em] text-white/20">
        SOZA © 2026
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>

    </div>
  );
};

export default Loading;
