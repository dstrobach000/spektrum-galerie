"use client";

import React, { useState } from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

const NameCard = ({
  curator,
  promo,
  install,
  photo,
  thanks,
  graphic = "Paul Gate",
}: {
  curator: string;
  promo: string;
  install: string;
  photo: string;
  thanks: string;
  graphic?: string;
}) => {
  // Fullscreen logic for the graphic image
  const [fullscreen, setFullscreen] = useState(false);

  // Regular fields
  const fields = [
    { label: "kurátorka:", value: curator },
    { label: "promo:", value: promo },
    { label: "foto:", value: photo },
    { label: "instalace:", value: install },
    { label: "grafika:", value: graphic },
  ];

  // Thanks list
  const thanksList = thanks
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Graphic section - 1/2 width on desktop */}
        <div className="w-full md:w-1/2 relative flex items-end">
          <img
            src="/images/weary_shout/weary_shout_10.jpg"
            alt="Weary Shout graphic"
            className="w-full h-auto block"
            draggable={false}
          />
          {/* Fullscreen Button at bottom center */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10">
            <GlowButton
              onClick={() => setFullscreen(true)}
              glowColor="bg-[#a3f730]"
              className="!px-2 !py-1"
              floating={false}
            >
              <span className="text-md font-light">⛶</span>
              <span className="ml-1 text-sm font-light">Fullscreen</span>
            </GlowButton>
          </div>
          {/* Fullscreen Modal */}
          {fullscreen && (
            <div className="fixed inset-0 bg-white bg-opacity-95 z-[100] flex items-center justify-center p-8">
              <div className="relative w-full max-w-3xl flex flex-col items-center">
                <img
                  src="/images/weary_shout/weary_shout_10.jpg"
                  alt="Weary Shout graphic fullscreen"
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

        {/* Fields section - 1/2 width on desktop, full on mobile */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 items-start">
            {fields.map((f) => (
              <div key={f.label} className="flex flex-col w-full md:w-[200px] mb-1">
                <span className="text-xs font-light mb-0.5">{f.label}</span>
                <span className="border border-black rounded-xl text-xs font-light px-3 py-2">{f.value}</span>
              </div>
            ))}
            {/* Thanks field: description + tag row */}
            {thanksList.length > 0 && (
              <div className="flex flex-col w-full md:w-[420px] mb-1">
                <span className="text-xs font-light mb-0.5">speciální poděkování:</span>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                  {thanksList.map((name, i) => (
                    <span
                      key={name + i}
                      className="border border-black rounded-xl text-xs font-light px-3 py-2"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
