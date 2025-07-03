// Header.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  return (
    <section className="px-6 sm:px-10 py-6">
      <div className="border border-black rounded-xl p-6 space-y-6">
        {/* MENU */}
        <div className="fixed top-4 left-4 z-50">
          <GlowButton onClick={onMenuClick} glowColor="bg-[#a3f730]">
            MENU
          </GlowButton>
        </div>

        {/* Main content (Logo + Texts) */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-10">
          {/* Logo */}
          <div className="mt-2 sm:mt-0 sm:order-1">
            <div className="border border-black rounded-xl inline-block leading-none">
              <RotatingLogo
                src="/logos/spektrum_galerie.svg"
                width={600}
                speed={10}
                className="block w-full h-auto"
              />
            </div>
          </div>

          {/* Texts */}
          <div className="flex flex-col items-start justify-center text-left space-y-4 max-w-4xl sm:order-2 mt-4 sm:mt-0">
            <div className="border border-black rounded-xl p-4">
              <p className="font-light">
                Spektrum galerie je experimentálním polem pro zkoumání rozmanitých forem současného umění napříč generacemi i médii. Věnuje se instalacím, objektům, obrazům, performancím i filmům. Založila ji výtvarnice Marie Hrachovcová, která ji kurátoruje spolu s kurátorkou Denisou Václavovou. Galerie sídlí v bývalé trafice na Kounicově ulici v Brně, odkud skrze výlohu komunikuje se světem. Název galerie je inspirován barevným spektrem, které je prostorem možností a současně i prostředkem ke zviditelnění.
              </p>
            </div>
            <div className="border border-black rounded-xl p-4">
              <p className="font-light">
                Spektrum gallery is an experimental space for investigating diverse forms of contemporary art across generations and media. It showcases installations, objects, paintings, performances and films. The gallery was founded by artist Marie Hrachovcová and is curated by her in collaboration with curator Denisa Václavová. Located in a former newsstand on Kounicova street in Brno, the gallery communicates with the outside world through its display window. The name of the gallery is inspired by the color spectrum – a space of possibilities as well as a means of making things visible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
