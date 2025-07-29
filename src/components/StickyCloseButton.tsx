// StickyCloseButton.tsx
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
      glowColor="bg-orange-400"
      onClick={onClick}
      className={`uppercase text-xl ${className}`}
    >
      {label}
    </GlowButton>
  </div>
);

export default StickyCloseButton;
