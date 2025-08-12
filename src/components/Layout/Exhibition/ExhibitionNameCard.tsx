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
  const [fullscreen, setFullscreen] = useState(false);

  const fields = [
    { label: "kurátorka:", value: curator },
    { label: "promo:", value: promo },
    { label: "foto:", value: photo },
    { label: "instalace:", value: install },
    { label: "grafika:", value: graphic },
  ];

  const thanksList = thanks
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Graphic */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center">
          <img
            src="/images/weary_shout/weary_shout_10.jpg"
            alt="Weary Shout graphic"
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

        {/* Text Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            {/* Label on top, tag below — horizontally flowing blocks */}
            {fields.map((f) => (
              <div key={f.label} className="flex flex-col">
                <span className="text-xs font-light mb-0.5">{f.label}</span>
                <span className="border border-black rounded-xl text-xs font-light px-3 py-2 w-fit">
                  {f.value}
                </span>
              </div>
            ))}

            {/* Special thanks */}
            {thanksList.length > 0 && (
              <div className="flex flex-col w-full mt-2">
                <span className="text-xs font-light mb-0.5">speciální poděkování:</span>
                <div className="flex flex-wrap gap-x-3 gap-y-2 mt-0.5">
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
