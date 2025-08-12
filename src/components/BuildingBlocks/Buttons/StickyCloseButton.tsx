"use client";

import React from "react";
import GlowButton from "./GlowButton";

const StickyCloseButton = ({
  onClick,
  label = "Zavřít",
  className = "",
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) => (
  <div className="fixed left-4 top-[7.5rem] z-50">
    <GlowButton
      glowColor="bg-[#a3f730]"
      onClick={onClick}
      className={`text-lg ${className}`}
      floating={true}
    >
      {label}
    </GlowButton>
  </div>
);

export default StickyCloseButton;
