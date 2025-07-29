// MenuContent.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const menuItems = [
  { label: "O galerii", href: "#o-galerii" },
  { label: "Program", href: "#program" },
  { label: "Aktuální", href: "#aktualni" },
  { label: "Uplynulé", href: "#uplynule" },
];

const MenuContent = ({ onClose }: { onClose?: () => void }) => (
  <div className="max-w-4xl mx-auto"> {/* match ContactContent's max width */}
    <div className="border border-black rounded-xl p-6 relative">
      {/* Sticky ZAVŘÍT button */}
      {onClose && (
        <div className="fixed left-4 top-[7.5rem] z-50">
          <GlowButton onClick={onClose} glowColor="bg-orange-400">
            ZAVŘÍT
          </GlowButton>
        </div>
      )}

      <div className="mt-2 sm:mt-0 relative space-y-4">
        {/* Logo */}
        <div className="border border-black rounded-xl w-full leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            speed={10}
            className="block w-full h-auto"
          />
        </div>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <div key={item.label} className="border border-black rounded-xl">
            <GlowButton
              className="w-full py-4 text-xl uppercase text-black"
              glowColor="bg-[#a3f730]"
              onClick={() => {
                window.location.href = item.href;
                if (onClose) onClose();
              }}
            >
              {item.label}
            </GlowButton>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MenuContent;
