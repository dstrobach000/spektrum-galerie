// StickyGalleryNav.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";

interface StickyGalleryNavProps {
  onNext: () => void;
  onPrev: () => void;
}

const StickyGalleryNav: React.FC<StickyGalleryNavProps> = ({ onNext, onPrev }) => (
  <div className="fixed top-[12rem] right-4 z-50 flex flex-col gap-3 pointer-events-none">
    <div className="pointer-events-auto">
      <GlowButton
        onClick={onPrev}
        glowColor="bg-[#856a3c]"
        className="min-w-[96px] font-light"
      >
        Zpátky
      </GlowButton>
    </div>
    <div className="pointer-events-auto">
      <GlowButton
        onClick={onNext}
        glowColor="bg-[#e2e8ea]"
        className="min-w-[96px] font-light"
      >
        Dál
      </GlowButton>
    </div>
  </div>
);

export default StickyGalleryNav;
