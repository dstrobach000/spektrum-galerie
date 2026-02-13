import React from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import BrandMediaRow from "@/components/Layout/BrandMediaRow";
import type { PressLinkUI } from "@/types/Press";

type Props = { links?: PressLinkUI[] };

const PressContent = ({ links = [] }: Props) => (
  <div className="w-full relative">
    <div className="relative max-w-[1200px] mx-auto">
      <BrandMediaRow className="mb-6" />

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
    </div>
);

export default PressContent;
