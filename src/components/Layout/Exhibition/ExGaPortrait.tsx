"use client";
import React, { useState } from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { ImageAsset } from "@/types/Exhibition";

const ExGaPortrait = ({ images = [] }: { images: ImageAsset[] }) => {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (!images.length) return null;

  const prevImg = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImg = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const currentImgUrl = images[index]?.asset?.url || "";

  return (
    <>
      <div className="relative w-full">
        {currentImgUrl && (
          <img
            src={currentImgUrl}
            alt={`Artwork ${index + 1}`}
            className="w-full h-auto block"
          />
        )}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <GlowButton onClick={prevImg} glowColor="bg-[#a3f730]" className="!p-2" floating={false}>
            <span className="text-md font-light">&lt;</span>
          </GlowButton>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <GlowButton onClick={nextImg} glowColor="bg-[#a3f730]" className="!p-2" floating={false}>
            <span className="text-md font-light">&gt;</span>
          </GlowButton>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10">
          <GlowButton onClick={() => setFullscreen(true)} glowColor="bg-[#a3f730]" className="!px-4 !py-2" floating={false}>
            <span className="text-sm font-light">⛶</span>
            <span className="ml-2 font-light text-sm">Fullscreen</span>
          </GlowButton>
        </div>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-[100] flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl mx-auto">
            {currentImgUrl && (
              <img
                src={currentImgUrl}
                alt={`Artwork ${index + 1}`}
                className="w-full h-auto block"
              />
            )}
          </div>
          <div className="mt-8 flex w-full max-w-2xl justify-between items-center mx-auto">
            <GlowButton onClick={prevImg} glowColor="bg-[#a3f730]" className="!p-2" floating={false}>
              <span className="text-2xl font-light">&lt;</span>
            </GlowButton>
            <GlowButton onClick={() => setFullscreen(false)} glowColor="bg-[#a3f730]" className="!px-4 !py-2" floating={false}>
              <span className="font-light">Zavřít</span>
            </GlowButton>
            <GlowButton onClick={nextImg} glowColor="bg-[#a3f730]" className="!p-2" floating={false}>
              <span className="text-2xl font-light">&gt;</span>
            </GlowButton>
          </div>
        </div>
      )}
    </>
  );
};

export default ExGaPortrait;
