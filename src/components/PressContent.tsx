// PressContent.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";
import StickyCloseButton from "./StickyCloseButton";

// Your actual press materials/links
const pressLinks = [
  { label: "Presskit 2025 (PDF)", href: "#" },
  { label: "Loga Spektrum galerie", href: "#" },
  { label: "Tisková zpráva", href: "#" },
];

const PressContent = ({ onClose }: { onClose?: () => void }) => (
  <div className="max-w-4xl mx-auto">
    <div className="border border-black rounded-xl p-6 relative">
      {onClose && <StickyCloseButton onClick={onClose} />}
      <div className="mt-2 sm:mt-0 relative space-y-4">
        <div className="border border-black rounded-xl w-full leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            speed={10}
            className="block w-full h-auto"
          />
        </div>
        {pressLinks.map((item) => (
          <div key={item.label} className="border border-black rounded-xl">
            <GlowButton
              className="w-full py-4 text-xl uppercase text-black"
              glowColor="bg-[#a3f730]"
            >
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </GlowButton>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PressContent;
