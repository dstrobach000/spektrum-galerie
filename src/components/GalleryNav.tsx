// GalleryNav.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";

interface GalleryNavProps {
  onNext: () => void;
  onPrev: () => void;
}

const GalleryNav: React.FC<GalleryNavProps> = ({ onNext, onPrev }) => (
  <div className="flex justify-between w-full items-center mt-2 mb-4 gap-4">
    <GlowButton
      onClick={onNext}
      glowColor="bg-[#a3f730]"
      className="min-w-[140px] px-6 font-light uppercase text-center text-xs"
    >
      NÁSLEDUJÍCÍ
    </GlowButton>
    <GlowButton
      onClick={onPrev}
      glowColor="bg-[#a3f730]"
      className="min-w-[140px] px-6 font-light uppercase text-center text-xs"
    >
      PŘEDCHÁZEJÍCÍ
    </GlowButton>
  </div>
);

export default GalleryNav;
