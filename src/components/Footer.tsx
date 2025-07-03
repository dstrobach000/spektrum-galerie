// Footer.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";

const Footer = ({
  onContactClick,
  onPressClick,
}: {
  onContactClick?: () => void;
  onPressClick?: () => void;
}) => {
  return (
    <footer className="border-t border-black bg-white px-6 sm:px-10 py-10 sm:py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full w-full">
          <GlowButton onClick={onContactClick} className="px-8 py-4 text-xl" glowColor="bg-[#a3f730]">
            KONTAKTY
          </GlowButton>
        </div>

        <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full w-full">
          <form className="space-y-4 w-full max-w-sm flex flex-col items-center">
            <input
              type="email"
              placeholder="Zadejte svůj e-mail"
              className="px-4 py-2 border border-black rounded-full w-full focus:outline-none font-light text-center uppercase"
            />
            <GlowButton className="w-max px-6 py-2 text-base" type="submit" glowColor="bg-[#a3f730]">
              ODEBÍRAT NEWSLETTER
            </GlowButton>
          </form>
        </div>

        <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full w-full">
          <GlowButton onClick={onPressClick} className="px-8 py-4 text-xl" glowColor="bg-[#a3f730]">
            PRESS
          </GlowButton>
        </div>

        <div className="p-4 flex flex-col items-center justify-center h-full w-full space-y-4">
          <div className="flex gap-8 justify-center items-center">
            <img
              src="/logos/ministerstvo_kultury.jpg"
              alt="Ministerstvo kultury"
              className="h-8 object-contain animate-float-pulse"
            />
            <img
              src="/logos/brno.jpg"
              alt="Brno"
              className="h-8 object-contain animate-float-pulse"
            />
          </div>
          <p className="text-sm font-light text-black text-center leading-snug max-w-xs animate-float-pulse">
            Děkujeme statutárnímu městu Brnu a Ministerstvu kultury České republiky za finanční podporu tohoto projektu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
