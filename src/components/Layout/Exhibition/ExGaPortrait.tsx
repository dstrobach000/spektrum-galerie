"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { ImageAsset } from "@/types/Exhibition";

const ExGaPortrait = ({ images = [] }: { images: ImageAsset[] }) => {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const hasMultiple = images.length > 1;
  const currentImgUrl = images[index]?.asset?.url || "";

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
    const preventTouch = (e: TouchEvent) => e.preventDefault();

    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    } as CSSStyleDeclaration);
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventTouch);
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        overflow: "",
      } as CSSStyleDeclaration);
      document.documentElement.style.overflow = "";
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
        {currentImgUrl && (
          <Image
            src={currentImgUrl}
            alt=""
            width={600}
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
      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-white grid"
          style={{ minHeight: "100dvh", gridTemplateRows: "1fr auto" }}
        >
          <div className="min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-8">
            {currentImgUrl && (
              <Image
                src={currentImgUrl}
                alt=""
                width={800}
                height={1200}
                className="block h-full w-auto max-w-full object-contain"
                draggable={false}
                sizes="100vw"
              />
            )}
          </div>

          <div className="p-4 sm:p-6 flex w-full max-w-2xl justify-between items-center mx-auto">
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
        </div>
      )}
    </>
  );
};

export default ExGaPortrait;
