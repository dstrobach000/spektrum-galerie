"use client";

import React, { useEffect, useState, useRef } from "react";
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
  exhibitionGraphic?: string; // Optional exhibition graphic URL
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
  exhibitionGraphic,
}) => {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to only load images when slideshow is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '200px' // Start loading 200px before entering viewport for smoother experience
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (images.length === 0 || !isVisible) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [images.length, interval, isVisible]);

  // Preload all images immediately when visible for seamless transitions
  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    
    // Preload all images using native Image constructor to eliminate flickering
    images.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
      };
      img.onerror = () => {
        // Still mark as loaded to prevent infinite loading states
        setLoadedImages(prev => new Set([...prev, index]));
      };
    });
  }, [isVisible, images]);

  // Preload next image when current changes (fallback)
  useEffect(() => {
    if (!isVisible) return;
    const nextIndex = (index + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      setLoadedImages(prev => new Set([...prev, nextIndex]));
    }
  }, [index, images.length, loadedImages, isVisible]);

  return (
    <div ref={containerRef} className="w-full aspect-[4/5] flex flex-col items-start">
      {/* Preload hints for all slideshow images */}
      {images.map((imageSrc, idx) => (
        <link
          key={`preload-${idx}`}
          rel="preload"
          as="image"
          href={imageSrc}
          fetchPriority="high"
        />
      ))}
      <div className="relative w-full h-full overflow-hidden shadow-md">
        {/* Always render first image immediately for LCP optimization */}
        {images.length > 0 && (
          <div
            className={`absolute inset-0 ${
              0 === index ? 'block' : 'hidden'
            }`}
          >
            <Image
              src={images[0]}
              alt={`${author} 1`}
              fill
              className="object-cover"
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        {/* Render other images only when visible and loaded */}
        {isVisible && images.slice(1).map((imageSrc, imgIndex) => {
          const actualIndex = imgIndex + 1;
          if (!loadedImages.has(actualIndex)) return null;
          return (
            <div
              key={imageSrc}
              className={`absolute inset-0 ${
                actualIndex === index ? 'block' : 'hidden'
              }`}
            >
              <Image
                src={imageSrc}
                alt={`${author} ${actualIndex + 1}`}
                fill
                className="object-cover"
                priority={false}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          );
        })}
        
        {/* Show exhibition graphic when no photos are available */}
        {images.length === 0 && exhibitionGraphic && (
          <div className="absolute inset-0">
            <Image
              src={exhibitionGraphic}
              alt={`${author} exhibition graphic`}
              fill
              className="object-cover"
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        {/* Show loading state when not visible and no images/graphic */}
        {!isVisible && images.length === 0 && !exhibitionGraphic && (
          <div className="w-full h-full bg-gray-100 animate-pulse" />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
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
