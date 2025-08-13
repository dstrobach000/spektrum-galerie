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
      {/* Logo */}
      <div className="border border-black rounded-full w-full leading-none min-h-[200px] md:min-h-0 flex items-center justify-center mb-6 aspect-[3/1]">
        <RotatingLogo3D src="/3D/logo.glb" speed={10} className="w-full h-full" />
      </div>

      {/* Buttons - wrapped to contain glow */}
      <div className="flex flex-col gap-4 items-center">
        {pressLinks.map((item) => (
          <div
            key={item.label}
            className="inline-flex p-2 bg-white"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            <GlowButton
              link={item.href}
              className="px-8 py-4 text-black text-5xl text-center whitespace-normal break-words"
              glowColor="bg-[#a3f730]"
              floating={false}
            >
              {item.label}
            </GlowButton>
          </div>
        ))}
      </div>
    </div>
    <div className="h-6"></div>
  </div>
);

export default PressContent;
