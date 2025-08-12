"use client";

import React from "react";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

const pressLinks = [
  { label: "Manuál", href: "#" },
  { label: "Logo Spektrum galerie", href: "#" },
  { label: "Výroční zprávy", href: "#" },
  { label: "Open call", href: "#" },
];

const PressContent = () => (
  <div className="max-w-4xl mx-auto w-full">
    <div className="border border-black rounded-xl p-6 relative">
      <div className="border border-black rounded-full w-full leading-none p-4 flex items-center justify-center mb-6 aspect-[3/1]">
        <RotatingLogo3D src="/3D/logo.glb" speed={10} className="w-full h-full" />
      </div>

      {/* ✅ BIGGER GAP TO ISOLATE GLOWS */}
      <div className="flex flex-col items-center gap-y-10 mt-2">
        {pressLinks.map((item) => (
          <GlowButton
            key={item.label}
            link={item.href}
            className="px-8 py-4 text-black text-4xl text-center"
            glowColor="bg-[#a3f730]"
            floating={false}
          >
            {item.label}
          </GlowButton>
        ))}
      </div>
    </div>
    <div className="h-6"></div>
  </div>
);

export default PressContent;
