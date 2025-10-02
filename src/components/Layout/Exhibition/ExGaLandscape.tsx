"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { ImageAsset } from "@/types/Exhibition";
import { imageSizes } from "@/utils/sanityImageUrl";

const ExGaLandscape = ({ images = [] }: { images: ImageAsset[] }) => {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const hasMultiple = images.length > 1;
  const currentImgUrl = images[index]?.asset?.url || "";
  const optimizedImgUrl = currentImgUrl ? imageSizes.landscape(currentImgUrl) : "";
  const fullscreenImgUrl = currentImgUrl ? imageSizes.fullscreen(currentImgUrl) : "";

  // Memoized navigation handlers
  const prevImg = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length, hasMultiple]);

  const nextImg = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length, hasMultiple]);

  // Keyboard navigation while fullscreen
  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (hasMultiple && e.key === "ArrowLeft") prevImg();
      if (hasMultiple && e.key === "ArrowRight") nextImg();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, prevImg, nextImg, hasMultiple]);

  // Lock page scroll while overlay is open (desktop + iOS)
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

  // Don't render anything if there are no images
  if (images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Inline viewer */}
      <div className="relative w-full">
        {optimizedImgUrl && (
          <Image
            src={optimizedImgUrl}
            alt=""
            width={1200}
            height={800}
            className="w-full h-auto block"
            draggable={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Side arrows (hidden if single image) */}
        {hasMultiple && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <GlowButton
                onClick={prevImg}
                glowColor="bg-[#a3f730]"
                className="!p-2"
                floating={false}
              >
                <span className="text-md font-light">&lt;</span>
              </GlowButton>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <GlowButton
                onClick={nextImg}
                glowColor="bg-[#a3f730]"
                className="!p-2"
                floating={false}
              >
                <span className="text-md font-light">&gt;</span>
              </GlowButton>
            </div>
          </>
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

      {/* Fullscreen overlay (container + object-contain) */}
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
                alt=""
                width={1920}
                height={1080}
                className="block max-h-full max-w-full object-contain"
                draggable={false}
                sizes="100vw"
                style={{ 
                  width: 'auto', 
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: 'calc(100vh - 200px)' // Consistent with portrait gallery
                }}
              />
            )}
          </div>

          <div className="p-4 sm:p-6 pb-8 flex w-full max-w-3xl justify-between items-center mx-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}>
            {/* Prev (hidden if single image) */}
            {hasMultiple ? (
              <GlowButton
                onClick={prevImg}
                glowColor="bg-[#a3f730]"
                className="!p-2"
                floating={false}
              >
                <span className="text-2xl font-light">&lt;</span>
              </GlowButton>
            ) : (
              <span />
            )}

            <GlowButton
              onClick={() => setFullscreen(false)}
              glowColor="bg-[#a3f730]"
              className="!px-4 !py-2"
              floating={false}
            >
              <span className="font-light">Zavřít</span>
            </GlowButton>

            {/* Next (hidden if single image) */}
            {hasMultiple ? (
              <GlowButton
                onClick={nextImg}
                glowColor="bg-[#a3f730]"
                className="!p-2"
                floating={false}
              >
                <span className="text-2xl font-light">&gt;</span>
              </GlowButton>
            ) : (
              <span />
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExGaLandscape;
