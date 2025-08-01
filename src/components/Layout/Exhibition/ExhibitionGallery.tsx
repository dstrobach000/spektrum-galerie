"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

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

const MOBILE_MIN_HEIGHT = 400;

const PhotoGallery: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [portraitHeight, setPortraitHeight] = useState(MOBILE_MIN_HEIGHT);

  const imageRef = useRef<HTMLImageElement>(null);

  const handlePrev = () => {
    setIdx(idx === 0 ? images.length - 1 : idx - 1);
  };

  const handleNext = () => {
    setIdx(idx === images.length - 1 ? 0 : idx + 1);
  };

  // Every time the image or the window size changes, recalc the portraitHeight
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setIsPortrait(isPortrait);

    // Calculate how tall this portrait will be at full width on the device
    if (isPortrait && imageRef.current) {
      // The current rendered width (should be full screen width)
      const width = imageRef.current.clientWidth;
      // Portrait natural ratio
      const ratio = img.naturalHeight / img.naturalWidth;
      const height = Math.round(width * ratio);
      setPortraitHeight(height > MOBILE_MIN_HEIGHT ? height : MOBILE_MIN_HEIGHT);
    }
  };

  // Also recalculate on window resize (for responsive)
  useLayoutEffect(() => {
    function updateHeight() {
      if (imageRef.current && isPortrait) {
        const img = imageRef.current;
        const width = img.clientWidth;
        const ratio = img.naturalHeight / img.naturalWidth;
        const height = Math.round(width * ratio);
        setPortraitHeight(height > MOBILE_MIN_HEIGHT ? height : MOBILE_MIN_HEIGHT);
      }
    }
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
    // eslint-disable-next-line
  }, [isPortrait, idx]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Desktop: unchanged */}
      <div className="hidden md:flex relative w-full max-w-[900px] h-[70vh] items-center justify-center bg-transparent mt-6">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <GlowButton
            onClick={handleNext}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase text-xs"
          >
            DÁL
          </GlowButton>
        </div>
        <img
          src={images[idx]}
          alt=""
          className="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-500 mx-auto"
          draggable={false}
          style={{ background: "none" }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <GlowButton
            onClick={handlePrev}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase text-xs"
          >
            ZPĚT
          </GlowButton>
        </div>
      </div>

      {/* Mobile: portrait/landscape perfectly matched height */}
      <div className="flex flex-col w-full items-center md:hidden mb-4 mt-4">
        <div
          className="w-full flex items-center justify-center overflow-hidden mb-4"
          style={{
            height: `${portraitHeight}px`,
            minHeight: `${MOBILE_MIN_HEIGHT}px`,
            transition: "height 0.3s",
          }}
        >
          <img
            key={images[idx]} // force new load event for every image
            ref={imageRef}
            src={images[idx]}
            alt=""
            onLoad={handleImageLoad}
            className={
              isPortrait
                ? "w-full h-auto object-contain transition-all duration-500"
                : "w-full h-auto max-h-full object-contain mx-auto transition-all duration-500"
            }
            draggable={false}
            style={{ background: "none", display: "block", margin: "0 auto" }}
          />
        </div>
        <div className="flex w-full justify-between items-center gap-4">
          <GlowButton
            onClick={handleNext}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase flex-1 text-xs"
          >
            DÁL
          </GlowButton>
          <GlowButton
            onClick={handlePrev}
            glowColor="bg-[#a3f730]"
            className="font-light uppercase flex-1 text-xs"
          >
            ZPĚT
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
