"use client";

import React, { useEffect, useRef, useState } from "react";

const defaultLandscapeImages = [
  "/images/weary_shout/weary_shout_6.jpg",
  "/images/weary_shout/weary_shout_7.jpg",
  "/images/weary_shout/weary_shout_8.jpg",
  "/images/weary_shout/weary_shout_9.jpg",
];
const defaultPortraitImages = [
  "/images/weary_shout/weary_shout_1.jpg",
  "/images/weary_shout/weary_shout_2.jpg",
  "/images/weary_shout/weary_shout_3.jpg",
  "/images/weary_shout/weary_shout_4.jpg",
  "/images/weary_shout/weary_shout_5.jpg",
];

interface PhotoGalleryProps {
  landscape?: string[];
  portrait?: string[];
  interval?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  landscape = defaultLandscapeImages,
  portrait = defaultPortraitImages,
  interval = 2000,
}) => {
  const [landscapeIdx, setLandscapeIdx] = useState(0);
  const [portraitIdx, setPortraitIdx] = useState(0);
  const landscapeTimeout = useRef<NodeJS.Timeout | null>(null);
  const portraitTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (landscape.length < 2) return;
    landscapeTimeout.current = setTimeout(() => {
      setLandscapeIdx((i) => (i + 1) % landscape.length);
    }, interval);
    return () => landscapeTimeout.current && clearTimeout(landscapeTimeout.current);
  }, [landscapeIdx, landscape, interval]);

  useEffect(() => {
    if (portrait.length < 2) return;
    portraitTimeout.current = setTimeout(() => {
      setPortraitIdx((i) => (i + 1) % portrait.length);
    }, interval);
    return () => portraitTimeout.current && clearTimeout(portraitTimeout.current);
  }, [portraitIdx, portrait, interval]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full overflow-hidden aspect-[16/9] bg-gray-100">
        <img
          src={landscape[landscapeIdx]}
          alt=""
          className="w-full h-full object-cover object-center transition-all duration-700"
          draggable={false}
        />
      </div>
      <div className="w-full overflow-hidden aspect-[4/5] bg-gray-100">
        <img
          src={portrait[portraitIdx]}
          alt=""
          className="w-full h-full object-cover object-center transition-all duration-700"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
