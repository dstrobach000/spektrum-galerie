"use client";

import React from "react";
import Image from "next/image";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

const Footer = ({
  onContactClick,
  onPressClick,
}: {
  onContactClick?: () => void;
  onPressClick?: () => void;
}) => {
  return (
    <footer className="border-t border-black bg-white px-6 sm:px-10 py-10 sm:py-6" id="footer">
      <div className="max-w-7xl mx-auto">
        {/* Main grid with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
            <GlowButton
              onClick={onContactClick}
              className="px-4 py-2 text-lg w-1/2 self-center"
              glowColor="bg-[#a3f730]"
              floating={false}
            >
              Kontakty
            </GlowButton>
          </div>
          <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
            <form className="space-y-4 w-full max-w-sm flex flex-col items-center">
              <input
                type="email"
                placeholder="Zadejte svůj e-mail"
                className="px-4 py-2 border border-black rounded-full w-full focus:outline-none font-light text-center"
              />
              <GlowButton
                className="px-4 py-2 text-lg w-3/4 self-center"
                type="submit"
                glowColor="bg-[#a3f730]"
                floating={false}
              >
                Odebírat newsletter
              </GlowButton>
            </form>
          </div>
          <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
            <GlowButton
              onClick={onPressClick}
              className="px-4 py-2 text-lg w-1/2 self-center"
              glowColor="bg-[#a3f730]"
              floating={false}
            >
              Ke stažení
            </GlowButton>
          </div>
        </div>

        {/* Thank you note, logos, copyright - all centered and spaced */}
        <div className="mt-8 flex flex-col items-center w-full">
          {/* Thank you note */}
          <p className="text-sm font-light text-black text-center leading-snug mb-3">
            Děkujeme statutárnímu městu Brnu a Ministerstvu kultury České republiky za finanční podporu tohoto projektu.
          </p>
          {/* Logos */}
          <div className="flex gap-4 justify-center items-center">
            <Image
              src="/logos/ministerstvo_kultury.png"
              alt="Ministerstvo kultury"
              height={32}
              width={100}
              className="h-8 object-contain"
            />
            <Image
              src="/logos/brno.png"
              alt="Brno"
              height={32}
              width={100}
              className="h-12 object-contain"
            />
          </div>
          {/* Copyright */}
          <p className="text-xs text-black font-light text-center mt-3">
            © Spektrum galerie 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
