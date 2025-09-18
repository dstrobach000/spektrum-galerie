"use client";

import React from "react";
import GlowBox from "@/components/BuildingBlocks/Labels/GlowBox";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import FormattedText from "@/components/BuildingBlocks/Text/FormattedText";

type Props = {
  artist: string;
  exhibitionName: string;
  date: string;
  onPrev?: () => void;
  onNext?: () => void;
  glowColor?: string;
};

const ExhibitionHeader: React.FC<Props> = ({
  artist,
  exhibitionName,
  date,
  onPrev,
  onNext,
  glowColor = "bg-[#a3f730]",
}) => {
  return (
    <div className="px-0">
      <GlowBox className="w-full py-4 text-xl font-light" glowColor={glowColor}>
        <div className="flex items-center w-full gap-3">
          <div style={{ willChange: "transform", transform: "translateZ(0)" }}>
            <GlowButton
              type="button"
              onClick={onPrev}
              glowColor={glowColor}
              className="min-w-0 w-auto px-3 py-1 text-sm md:text-base font-light"
              floating={false}
              aria-label="Previous exhibition"
            >
              &lt;
            </GlowButton>
          </div>

          <div className="flex-1 px-3">
            <FormattedText
              leftContent={`${artist}: ${exhibitionName}`}
              rightContent={date}
            />
          </div>

          <div style={{ willChange: "transform", transform: "translateZ(0)" }}>
            <GlowButton
              type="button"
              onClick={onNext}
              glowColor={glowColor}
              className="min-w-0 w-auto px-3 py-1 text-sm md:text-base font-light"
              floating={false}
              aria-label="Next exhibition"
            >
              &gt;
            </GlowButton>
          </div>
        </div>
      </GlowBox>

    </div>
  );
};

export default ExhibitionHeader;
