// MenuContent.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const MenuContent = ({ onClose }: { onClose?: () => void }) => {
  const menuItems = [
    { label: "O galerii", href: "#o-galerii" },
    { label: "Program", href: "#program" },
    { label: "Aktuální", href: "#aktualni" },
    { label: "Uplynulé", href: "#uplynule" },
  ];

  return (
    <div className="space-y-10 px-6 sm:px-10 py-10 w-full text-center">
      {/* ✅ Rotating Logo Block (matching Header style) */}
      <div className="flex justify-center">
        <div className="border border-black rounded-xl inline-block leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            width={600}
            speed={10}
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* ✅ Menu Buttons */}
      {menuItems.map((item) => (
        <GlowButton
          key={item.label}
          className="w-full py-4 text-xl uppercase text-black"
          glowColor="bg-[#a3f730]"
          onClick={() => {
            window.location.href = item.href;
          }}
        >
          {item.label}
        </GlowButton>
      ))}

      {/* ✅ Close Button */}
      <GlowButton
        onClick={onClose}
        className="w-full py-4 text-xl uppercase text-black"
        glowColor="bg-orange-400"
      >
        Zavřít
      </GlowButton>
    </div>
  );
};

export default MenuContent;
