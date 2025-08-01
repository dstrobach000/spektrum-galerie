import React from "react";

interface GlowBoxProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowBox = ({
  children,
  className = "",
  glowColor = "bg-[#a3f730]",
}: GlowBoxProps) => (
  <div
    className={`relative inline-block rounded-full px-6 py-2 text-lg font-light text-black animate-float-pulse ${className}`}
    tabIndex={-1}
    aria-hidden="true"
  >
    <span className={`absolute -inset-2 rounded-full blur-md pointer-events-none ${glowColor}`}></span>
    <span className="relative z-10">{children}</span>
  </div>
);

export default GlowBox;
