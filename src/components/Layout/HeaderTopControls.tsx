"use client";

import React from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

export default function HeaderTopControls() {
  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/spektrumgalerie", icon: "FB" },
    { name: "Instagram", href: "https://www.instagram.com/spektrum___galerie/", icon: "IG" },
  ];

  const venueLinks = [
    { name: "Spektrum Bar", href: "https://www.instagram.com/spektrumbar/", glowColor: "bg-[#ff9ff5]", glowStyle: { backgroundColor: "#ff9ff5" } },
    { name: "Fleda", href: "https://www.fleda.cz", glowColor: "bg-orange-500", glowStyle: { backgroundColor: "#f97316" } },
    { name: "Fraktal", href: "https://www.instagram.com/fraktal_noise/", glowColor: "bg-[#2f5bff]", glowStyle: { backgroundColor: "#2f5bff" } },
  ];

  return (
    <div
      id="header-top-controls"
      className="flex justify-between items-start md:items-center mb-6 md:mb-8 flex-wrap gap-x-3 gap-y-2 w-full min-w-0 relative z-20"
    >
      <div className="flex gap-3 max-sm:gap-2 flex-shrink-0 order-2 md:order-1">
        {socialLinks.map((social) => (
          <div key={social.name} className="p-1 flex-shrink-0">
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-full font-light text-black border border-black bg-transparent hover:bg-gray-300 transition-colors flex items-center justify-center"
              style={{ aspectRatio: "1/1" }}
              aria-label={social.name}
            >
              <span className="text-sm max-sm:text-xs">{social.icon}</span>
            </a>
          </div>
        ))}
      </div>

      <div className="order-1 basis-full flex flex-wrap justify-start gap-3 pt-1 md:order-2 md:basis-auto md:ml-auto md:pt-0 md:flex-nowrap md:justify-end">
        {venueLinks.map((venue) => (
          <GlowButton
            key={venue.name}
            link={venue.href}
            glowColor={venue.glowColor}
            glowStyle={venue.glowStyle}
            floating={false}
            className="px-3.5 py-1.5 text-sm leading-none whitespace-nowrap"
          >
            {`→ ${venue.name}`}
          </GlowButton>
        ))}
      </div>
    </div>
  );
}
