"use client";

import React, { useState } from "react";
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

  // For all other fields, keep the original field order/labels where possible
  // You can set your preferred order and labels here if needed:
  const preferredOrder = [
    "kurátorka",
    "promo",
    "foto",
    "instalace",
    "grafika",
    "speciální poděkování",
  ];

  // Sort fields to match preferredOrder, others at the end
  const sortedFields = [
    ...preferredOrder.map((label) => {
      // handle "speciální poděkování" specially
      if (label === "speciální poděkování" && thanksList.length) {
        return { label, value: thanksList.join(", ") };
      }
      const entry = namecard.find(
        (e) => e.role.trim().toLowerCase() === label
      );
      if (entry) return { label, value: entry.name };
      return null;
    }),
    // Add any remaining fields not in preferredOrder
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
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Graphic */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center">
          {graphic?.url && (
            <>
              <img
                src={graphic.url}
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
                  <span className="text-md font-light">⛶</span>
                </GlowButton>
              </div>
            </>
          )}
          {fullscreen && (
            <div className="fixed inset-0 bg-white bg-opacity-95 z-[100] flex items-center justify-center p-8">
              <div className="relative w-full max-w-3xl flex flex-col items-center">
                <img
                  src={graphic?.url}
                  alt="Exhibition graphic fullscreen"
                  className="w-full h-auto block"
                  draggable={false}
                />
                <GlowButton
                  onClick={() => setFullscreen(false)}
                  glowColor="bg-[#a3f730]"
                  className="!px-4 !py-2 mt-6"
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
                key={i}
                className={`flex flex-col p-3 font-light ${
                  !isTopRow ? "border-t border-black" : ""
                } ${!isLeftCol ? "border-l border-black" : ""}`}
              >
                <span className="text-xs mb-1">{f?.label}:</span>
                <span className="text-sm leading-snug">{f?.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionNameCard;
