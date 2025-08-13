"use client";

import React, { useState } from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

const portraitImages = [
  "/images/weary_shout/weary_shout_1.jpg",
  "/images/weary_shout/weary_shout_2.jpg",
  "/images/weary_shout/weary_shout_3.jpg",
  "/images/weary_shout/weary_shout_4.jpg",
  "/images/weary_shout/weary_shout_5.jpg",
  "/images/weary_shout/weary_shout_6.jpg",
  "/images/weary_shout/weary_shout_8.jpg",
];

const ExGaPortrait = () => {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const prevImg = () => setIndex((prev) => (prev === 0 ? portraitImages.length - 1 : prev - 1));
  const nextImg = () => setIndex((prev) => (prev === portraitImages.length - 1 ? 0 : prev + 1));

  return (
    <>
      <div className="relative w-full">
        <img
          src={portraitImages[index]}
          alt={`Artwork ${index + 1}`}
          className="w-full h-auto block"
        />
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
            <img
              src={portraitImages[index]}
              alt={`Artwork ${index + 1}`}
              className="w-full h-auto block"
            />
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
