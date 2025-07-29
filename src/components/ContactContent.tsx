// ContactContent.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";
import StickyCloseButton from "./StickyCloseButton";

const ContactContent = ({ onClose }: { onClose?: () => void }) => (
  <div className="max-w-4xl mx-auto">
    <div className="border border-black rounded-xl p-6 relative">
      {onClose && <StickyCloseButton onClick={onClose} />}
      <div className="mt-2 sm:mt-0 relative space-y-4">
        <div className="border border-black rounded-xl w-full leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            speed={10}
            className="block w-full h-auto"
          />
        </div>
        <div className="border border-black rounded-xl p-6">
          <p className="font-light">Spektrum galerie</p>
          <p className="font-light">Štefánikova 95/24</p>
          <p className="font-light mb-4">Brno 602 00</p>
          <GlowButton
            className="w-full py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            onClick={() =>
              window.open(
                "https://maps.app.goo.gl/1dfvm2mG5KwDseGZA",
                "_blank"
              )
            }
          >
            Otevřít v Mapách
          </GlowButton>
        </div>
        <div className="border border-black rounded-xl p-6">
          <p className="font-light">Fléda Art z.s.</p>
          <p className="font-light">Cejl 514/46, Zábrdovice</p>
          <p className="font-light">602 00 Brno</p>
          <p className="font-light">IČ: 27002977</p>
        </div>
        <p className="text-center text-lg font-light">
          Otevírací doba galerie se odvíjí od formátu jednotlivých výstavy. Aktuální informace najdete na našem Instagramu. Návštěvu mimo otevírací dobu je možné domluvit individuálně.
        </p>
        <div className="flex justify-center gap-4">
          <GlowButton
            className="px-6 py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            onClick={() => window.open("https://facebook.com", "_blank")}
          >
            Facebook
          </GlowButton>
          <GlowButton
            className="px-6 py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            onClick={() => window.open("https://instagram.com/spektrumgalerie", "_blank")}
          >
            Instagram
          </GlowButton>
        </div>
        <div className="border border-black rounded-xl p-6">
          <p className="font-light">Adéla Petříčková</p>
          <p className="font-light mb-4">Kurátorka</p>
          <GlowButton
            className="w-full py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            onClick={() => (window.location.href = "mailto:adela@spektrumgalerie.cz")}
          >
            adela@spektrumgalerie.cz
          </GlowButton>
        </div>
        <div className="border border-black rounded-xl p-6">
          <p className="font-light">Kateřina Pražáková</p>
          <p className="font-light mb-4">PR</p>
          <GlowButton
            className="w-full py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            onClick={() => (window.location.href = "mailto:katerina@spektrumgalerie.cz")}
          >
            katerina@spektrumgalerie.cz
          </GlowButton>
        </div>
      </div>
    </div>
  </div>
);

export default ContactContent;
