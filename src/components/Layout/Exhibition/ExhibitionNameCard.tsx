"use client";

import React, { useEffect, useState } from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

type NameCardEntry = {
  role: string;
  name: string;
};

type ExhibitionNameCardProps = {
  namecard: NameCardEntry[];
  graphic?: { url: string };
};

const ExhibitionNameCard: React.FC<ExhibitionNameCardProps> = ({
  namecard,
  graphic,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  // Keyboard: allow Esc to close while fullscreen (matching ExGa*)
  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  // Lock page scroll while overlay is open (desktop + iOS), same approach as ExGa*
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

  // For "speciální poděkování", split on , ; (or just treat as normal if not present)
  const thanksEntry = namecard.find(
    (entry) =>
      entry.role.toLowerCase().includes("poděkování") ||
      entry.role.toLowerCase().includes("dík") ||
      entry.role.toLowerCase().includes("thanks")
  );
  const thanksList = thanksEntry
    ? thanksEntry.name
        .split(/[;,]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Preferred order (unchanged)
  const preferredOrder = [
    "kurátorka",
    "promo",
    "foto",
    "instalace",
    "grafika",
    "speciální poděkování",
  ];

  // Sort fields (unchanged)
  const sortedFields = [
    ...preferredOrder.map((label) => {
      if (label === "speciální poděkování" && thanksList.length) {
        return { label, value: thanksList.join(", ") };
      }
      const entry = namecard.find(
        (e) => e.role.trim().toLowerCase() === label
      );
      if (entry) return { label, value: entry.name };
      return null;
    }),
    ...namecard
      .filter(
        (e) =>
          !preferredOrder.includes(e.role.trim().toLowerCase()) &&
          !(
            e.role.toLowerCase().includes("poděkování") ||
            e.role.toLowerCase().includes("dík") ||
            e.role.toLowerCase().includes("thanks")
          )
      )
      .map((e) => ({ label: e.role, value: e.name })),
  ].filter(Boolean) as { label: string; value: string }[];

  const graphicUrl = graphic?.url || "";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-12 md:gap-6 items-start">
        {/* Graphic */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center">
          {graphicUrl && (
            <>
              <img
                src={graphicUrl}
                alt="Exhibition graphic"
                className="w-full h-auto block"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <GlowButton
                  onClick={() => setFullscreen(true)}
                  glowColor="bg-[#a3f730]"
                  className="!px-2 !py-1"
                  floating={false}
                >
                  <span className="text-sm font-light">⛶</span>
                  <span className="ml-2 font-light text-sm">full screen</span>
                </GlowButton>
              </div>
            </>
          )}

          {/* Fullscreen overlay — consistent with ExGaPortrait/Landscape */}
          {fullscreen && (
            <div
              className="fixed inset-0 z-[100] bg-white grid"
              style={{ minHeight: "100dvh", gridTemplateRows: "1fr auto" }}
            >
              <div className="min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-8">
                {graphicUrl && (
                  <img
                    src={graphicUrl}
                    alt="Exhibition graphic fullscreen"
                    className="block h-full w-auto max-w-full object-contain"
                    draggable={false}
                  />
                )}
              </div>

              <div className="p-4 sm:p-6 flex w-full max-w-2xl justify-center items-center mx-auto">
                <GlowButton
                  onClick={() => setFullscreen(false)}
                  glowColor="bg-[#a3f730]"
                  className="!px-4 !py-2"
                  floating={false}
                >
                  <span className="font-light">Zavřít</span>
                </GlowButton>
              </div>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="w-full md:w-1/2 grid grid-cols-2">
          {sortedFields.map((f, i) => {
            const isTopRow = i < 2;
            const isLeftCol = i % 2 === 0;
            return (
              <div
                key={`${f.label}-${i}`}
                className={`flex flex-col p-3 font-light ${
                  !isTopRow ? "border-t border-black" : ""
                } ${!isLeftCol ? "border-l border-black" : ""}`}
              >
                <span className="text-xs mb-1">{f.label}:</span>
                <span className="text-sm leading-snug">{f.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionNameCard;
