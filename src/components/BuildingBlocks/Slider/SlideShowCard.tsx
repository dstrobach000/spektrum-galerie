"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CurrentLabel from "@/components/BuildingBlocks/Labels/CurrentLabel";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

type SlideShowCardProps = {
  images: string[];
  buttonText: string;
  author: string;
  date: string;
  interval?: number;
  onPillClick?: () => void;
  buttonClassName?: string;
  isCurrent?: boolean;
};

const SlideShowCard: React.FC<SlideShowCardProps> = ({
  images,
  buttonText,
  author,
  date,
  interval = 4,
  onPillClick,
  buttonClassName,
  isCurrent = false,
}) => {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Preload next image when current changes
  useEffect(() => {
    const nextIndex = (index + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      setLoadedImages(prev => new Set([...prev, nextIndex]));
    }
  }, [index, images.length, loadedImages]);

  return (
    <div className="w-full aspect-[4/5] flex flex-col items-start overflow-visible">
      <div className="relative w-full h-full overflow-visible shadow-md">
        {/* Only render loaded images to prevent flickering */}
        {images.map((imageSrc, imgIndex) => {
          if (!loadedImages.has(imgIndex)) return null;
          return (
            <Image
              key={imageSrc}
              src={imageSrc}
              alt={`${author} ${imgIndex + 1}`}
              fill
              className={`object-cover ${
                imgIndex === index ? 'block' : 'hidden'
              }`}
              priority={imgIndex === 0} // Only prioritize the first image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          <GlowButton
            onClick={onPillClick}
            className={`inline-block px-6 py-2 text-sm font-light text-black ${buttonClassName || ""}`}
            glowColor="bg-[#a3f730]"
            floating={false}
            type="button"
          >
            {buttonText}
          </GlowButton>
        </div>
      </div>

      {/* Author, Date, and Aktuální button below image */}
      <div className="mt-2 w-full flex flex-row items-center justify-between">
        <div className="text-left text-sm text-black font-light">
          {author}
          <br />
          {date}
        </div>
        {isCurrent && (
          <CurrentLabel>
            Aktuální
          </CurrentLabel>
        )}
      </div>
    </div>
  );
};

export default SlideShowCard;
