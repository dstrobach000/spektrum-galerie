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
    <div className="relative space-y-10 px-6 sm:px-10 py-10 w-full text-center">
      {/* ✅ Floating ZAVŘÍT button inside modal */}
      {onClose && (
        <div className="absolute left-4 top-4 z-50">
          <GlowButton onClick={onClose} glowColor="bg-orange-400">
            ZAVŘÍT
          </GlowButton>
        </div>
      )}

      {/* ✅ Rotating Logo */}
      <div className="flex justify-center mt-16">
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
    </div>
  );
};

export default MenuContent;
