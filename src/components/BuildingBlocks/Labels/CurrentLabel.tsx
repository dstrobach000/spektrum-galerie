"use client";

import React from "react";

const CurrentLabel = ({
  className = "",
  glowColor = "bg-[#ffb2de]",
  children = "Aktuální",
}: {
  className?: string;
  glowColor?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={`relative inline-block rounded-full px-6 py-2 text-sm font-light text-black ml-2 animate-float-pulse ${className}`}
    tabIndex={-1}
    aria-hidden="true"
  >
    <span className={`absolute -inset-2 rounded-full blur-md pointer-events-none ${glowColor}`}></span>
    <span className="relative z-10">{children}</span>
  </div>
);

export default CurrentLabel;
