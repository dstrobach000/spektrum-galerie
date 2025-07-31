"use client";

import React from "react";
import GlowButton from "./GlowButton";

interface GalleryOverlayHeaderProps {
  artist: string;
  exhibitionName: string;
  date: string;
}

const GalleryOverlayHeader: React.FC<GalleryOverlayHeaderProps> = ({
  artist,
  exhibitionName,
  date,
}) => {
  return (
    <>
      <div className="my-0 px-0">
        <GlowButton
          className="w-full py-4 text-xl font-light uppercase"
          glowColor="bg-[#a3f730]"
        >
          <div className="overlayheader-content w-full text-sm md:text-xl font-light uppercase gap-1 px-2 md:px-6">
            <span className="w-full overlayheader-item text-center">{artist}</span>
            <span className="w-full overlayheader-item text-center pulse-text text-lg">
              {exhibitionName}
            </span>
            <span className="w-full overlayheader-item text-center">{date}</span>
          </div>
        </GlowButton>
      </div>
      <style jsx>{`
        .pulse-text {
          display: inline-block;
          animation: pulseScale 2s ease-in-out infinite;
        }

        @keyframes pulseScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

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
          .overlayheader-item {
            width: auto;
            text-align: left;
          }
          .overlayheader-item:nth-child(2) {
            text-align: center;
          }
          .overlayheader-item:nth-child(3) {
            text-align: right;
          }
        }
        .overlayheader-item {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default GalleryOverlayHeader;
