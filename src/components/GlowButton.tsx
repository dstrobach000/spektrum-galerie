// GlowButton.tsx
import React from "react";

interface GlowButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "bg-[#a3f730]" or "bg-orange-400"
  type?: "button" | "submit" | "reset";
}

const GlowButton = ({
  onClick,
  children,
  className = "",
  glowColor = "bg-[#a3f730]",
  type = "button",
}: GlowButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`relative inline-block rounded-full px-6 py-2 text-lg font-light text-black transition-transform duration-300 hover:scale-105 animate-float-pulse ${className}`}
  >
    <span className={`absolute -inset-2 rounded-full blur-md pointer-events-none ${glowColor}`}></span>
    <span className="relative z-10">{children}</span>
  </button>
);

export default GlowButton;
