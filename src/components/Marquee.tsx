// Marquee.tsx
"use client";

import React from "react";

const Marquee = ({ text }: { text: string }) => (
  <>
    <div className="overflow-x-hidden whitespace-nowrap w-full">
      <div className="relative w-full">
        <div className="animate-marquee-loop flex whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span
              key={i}
              className="text-2xl font-bold uppercase tracking-wide mx-8"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
    <style>
      {`
        @keyframes marquee-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marquee-loop 16s linear infinite;
        }
      `}
    </style>
  </>
);

export default Marquee;
