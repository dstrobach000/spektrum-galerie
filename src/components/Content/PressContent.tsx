import React from "react";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import type { PressLinkUI } from "@/types/Press";

type Props = { links?: PressLinkUI[] };

const PressContent = ({ links = [] }: Props) => (
  <div className="w-full relative">
    <div className="border border-black rounded-xl p-6 relative max-w-4xl mx-auto">
      {/* Logo */}
      <div className="border border-black rounded-full w-full leading-none min-h-[150px] md:min-h-0 flex items-center justify-center mb-6 aspect-[3/1]">
        <RotatingLogo3D src="/3D/spektrum_galerie.glb" className="w-full h-full" />
      </div>

      {/* Buttons - wrapped to contain glow */}
      <div className="flex flex-col gap-4 items-center">
        {links.map((item) => (
          <div
            key={item.label}
            className="inline-flex p-2 bg-white"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            <GlowButton
              link={item.href}
              className="px-8 py-4 text-black text-2xl md:text-5xl text-center whitespace-normal break-words"
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
