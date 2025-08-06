"use client";

import React from "react";
import RotatingLogo from "@/components/BuildingBlocks/Logo/RotatingLogo";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

const pressLinks = [
  { label: "Půdorys", href: "#" },
  { label: "Logo Spektrum galerie", href: "#" },
  { label: "Výroční zpráva 2024", href: "#" },
];

const PressContent = () => (
  <div className="max-w-2xl mx-auto w-full p-6">
    {/* Logo */}
    <div className="border border-black rounded-full w-full leading-none p-4 flex items-center justify-center mb-8 aspect-[3/1]">
      <RotatingLogo
        src="/logos/spektrum_galerie.svg"
        speed={10}
        className="block w-full h-full"
      />
    </div>
    {/* Buttons - single column, centered */}
    <div className="flex flex-col gap-4 items-center">
      {pressLinks.map((item) => (
        <GlowButton
          key={item.label}
          className="px-6 py-4 text-base text-black"
          glowColor="bg-[#a3f730]"
          floating={false}
        >
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center"
          >
            {item.label}
          </a>
        </GlowButton>
      ))}
    </div>
  </div>
);

export default PressContent;
