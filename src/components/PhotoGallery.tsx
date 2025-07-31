"use client";

import React, { useState } from "react";
import GlowButton from "./GlowButton";

const images = [
  "/images/weary_shout/weary_shout_1.jpg",
  "/images/weary_shout/weary_shout_2.jpg",
  "/images/weary_shout/weary_shout_3.jpg",
  "/images/weary_shout/weary_shout_4.jpg",
  "/images/weary_shout/weary_shout_5.jpg",
  "/images/weary_shout/weary_shout_6.jpg",
  "/images/weary_shout/weary_shout_7.jpg",
  "/images/weary_shout/weary_shout_8.jpg",
  "/images/weary_shout/weary_shout_9.jpg",
];

const PhotoGallery: React.FC = () => {
  const [idx, setIdx] = useState(0);

  const handlePrev = () => {
    setIdx(idx === 0 ? images.length - 1 : idx - 1);
  };

  const handleNext = () => {
    setIdx(idx === images.length - 1 ? 0 : idx + 1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Desktop: overlay nav, fixed height */}
      <div className="hidden md:flex relative w-full max-w-[900px] h-[70vh] items-center justify-center bg-transparent">
        {/* Left button */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <GlowButton
            onClick={handleNext}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase"
          >
            DÁL
          </GlowButton>
        </div>
        {/* Image */}
        <img
          src={images[idx]}
          alt=""
          className="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-500 mx-auto"
          draggable={false}
          style={{ background: "none" }}
        />
        {/* Right button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <GlowButton
            onClick={handlePrev}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase"
          >
            ZPĚT
          </GlowButton>
        </div>
      </div>

      {/* Mobile: image + nav below, no jump */}
      <div className="flex flex-col w-full items-center md:hidden mb-4 mt-4">
        <div className="w-full h-[400px] flex items-center justify-center">
          <img
            src={images[idx]}
            alt=""
            className="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-500 mb-4"
            draggable={false}
            style={{ background: "none" }}
          />
        </div>
        <div className="flex w-full justify-between items-center gap-4">
          <GlowButton
            onClick={handleNext}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase flex-1"
          >
            DÁL
          </GlowButton>
          <GlowButton
            onClick={handlePrev}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase flex-1"
          >
            ZPĚT
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
