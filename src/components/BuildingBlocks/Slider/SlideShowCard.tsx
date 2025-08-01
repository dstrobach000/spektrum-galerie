// SlideShowCard.tsx
"use client";

import React, { useEffect, useState } from "react";
import CurrentLabel from "@/components/BuildingBlocks/Labels/CurrentLabel";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="w-full aspect-[4/5] flex flex-col items-start overflow-visible">
      <div className="relative w-full h-full overflow-visible shadow-md">
        <img
          src={images[index]}
          alt={`${author} ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          <button
            className={`${buttonClassName} animate-float-pulse`}
            onClick={onPillClick}
          >
            <span className="absolute -inset-2 rounded-full bg-[#a3f730] blur-sm pointer-events-none"></span>
            <span className="relative z-10">{buttonText}</span>
          </button>
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
