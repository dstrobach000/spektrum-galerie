"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { imageSizes } from "@/utils/sanityImageUrl";

interface ExhibitionGraphicProps {
  posterUrl: string;
  alt?: string;
}

// Copy of ExGaPortrait behavior, adapted for a single poster image
const ExhibitionGraphic = ({ posterUrl, alt = "Exhibition graphic" }: ExhibitionGraphicProps) => {
  const [fullscreen, setFullscreen] = useState(false);

  // Mirror ExGaPortrait logic exactly
  const currentImgUrl = posterUrl || "";
  const optimizedImgUrl = currentImgUrl ? imageSizes.portrait(currentImgUrl) : "";
  const fullscreenImgUrl = currentImgUrl ? imageSizes.fullscreen(currentImgUrl) : "";

  // Keyboard navigation while fullscreen
  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  // Lock page scroll while overlay is open (desktop + iOS) - identical to ExGaPortrait
  useEffect(() => {
    if (!fullscreen) return;

    const scrollY = window.scrollY;
    
    // Store original styles
    const originalBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      height: document.body.style.height,
    };
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Apply scroll lock - only prevent background scrolling
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    } as CSSStyleDeclaration);
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore original styles
      Object.assign(document.body.style, originalBodyStyle);
      document.documentElement.style.overflow = originalHtmlOverflow;
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [fullscreen]);

  if (!currentImgUrl) {
    return null;
  }

  return (
    <>
      {/* Inline viewer - identical to ExGaPortrait */}
      <div className="relative w-full">
        {optimizedImgUrl && (
          <Image
            src={optimizedImgUrl}
            alt={alt || ""}
            width={600}
            height={900}
            className="w-full h-auto block"
            draggable={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Fullscreen trigger */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10">
          <GlowButton
            onClick={() => setFullscreen(true)}
            glowColor="bg-[#a3f730]"
            className="!px-4 !py-2"
            floating={false}
          >
            <span className="text-sm font-light">⛶</span>
            <span className="ml-2 font-light text-sm">full screen</span>
          </GlowButton>
        </div>
      </div>

      {/* Fullscreen overlay (container + object-contain) - identical to ExGaPortrait */}
      {fullscreen && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-white"
          style={{ 
            zIndex: 99999,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100dvh", // Use dynamic viewport height for mobile
            maxHeight: "100vh", // Fallback for older browsers
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
            border: "none",
            outline: "none",
            isolation: "isolate",
            WebkitTransform: "translate3d(0, 0, 0)",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
            {fullscreenImgUrl && (
              <Image
                src={fullscreenImgUrl}
                alt={alt || ""}
                width={1920}
                height={1080}
                className="block max-h-full max-w-full object-contain"
                draggable={false}
                sizes="100vw"
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: 'calc(100vh - 200px)', // More space reserved for navigation
                  objectFit: 'contain'
                }}
              />
            )}
          </div>

          <div className="p-4 sm:p-6 pb-8 flex w-full max-w-3xl justify-between items-center mx-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}>
            <span />
            <GlowButton
              onClick={() => setFullscreen(false)}
              glowColor="bg-[#a3f730]"
              className="!px-4 !py-2"
              floating={false}
            >
              <span className="font-light">Zavřít</span>
            </GlowButton>
            <span />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExhibitionGraphic;