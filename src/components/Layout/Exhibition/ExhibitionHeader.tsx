"use client";

import React from "react";
import GlowBox from "@/components/BuildingBlocks/Labels/GlowBox";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

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
    <div className="my-0 px-0">
      <GlowBox className="w-full py-4 text-xl font-light mb-6" glowColor={glowColor}>
        {/* LEFT | CONTENT | RIGHT — all in the same container, no absolute positioning */}
        <div className="grid grid-cols-[auto,1fr,auto] items-center w-full gap-3">
          {/* left button */}
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

          {/* ORIGINAL CONTENT (unchanged) */}
          <div className="min-w-0">
            <div className="overlayheader-content w-full text-sm md:text-xl font-light gap-1">
              <span className="overlayheader-item">{artist}</span>
              <span className="overlayheader-item pulse-text">{exhibitionName}</span>
              <span className="overlayheader-item">{date}</span>
            </div>
          </div>

          {/* right button */}
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
      </GlowBox>

      <style jsx>{`
        .pulse-text {
          display: inline-block;
          animation: pulseScale 2s ease-in-out infinite;
        }
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* original responsive layout for the three text parts */
        .overlayheader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1050px) {
          .overlayheader-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          }
          .overlayheader-item { width: auto; }
          .overlayheader-item:nth-child(2) { text-align: center; }
          .overlayheader-item:nth-child(3) { text-align: right; }
        }
        .overlayheader-item { width: 100%; }
      `}</style>
    </div>
  );
};

export default ExhibitionHeader;
