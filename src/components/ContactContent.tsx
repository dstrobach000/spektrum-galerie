// ContactContent.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const ContactContent = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="space-y-10 px-6 sm:px-10 py-10 w-full text-black">
      {/* ✅ Rotating Logo at top */}
      <div className="flex justify-center">
        <div className="border border-black rounded-xl inline-block leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            width={600}
            speed={10}
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* Address blocks */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Block 1 */}
        <div className="border border-black rounded-xl p-6 flex-1">
          <p className="font-light">Spektrum galerie</p>
          <p className="font-light">Štefánikova 95/24</p>
          <p className="font-light mb-4">Brno 602 00</p>
          <GlowButton
            className="w-full py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Štefánikova+95%2F24,+Brno+602+00",
                "_blank"
              )
            }
          >
            Otevřít v Mapách
          </GlowButton>
        </div>

        {/* Block 2 */}
        <div className="border border-black rounded-xl p-6 flex-1">
          <p className="font-light">Fléda Art z.s.</p>
          <p className="font-light">Cejl 514/46, Zábrdovice</p>
          <p className="font-light">602 00 Brno</p>
          <p className="font-light">IČ: 27002977</p>
        </div>
      </div>

      {/* Centered note */}
      <p className="text-center text-lg font-light">
        Otevírací doba galerie se odvíjí od formátu jednotlivých výstavy. Aktuální informace najdete na našem Instagramu. Návštěvu mimo otevírací dobu je možné domluvit individuálně.
      </p>

      {/* Socials */}
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

      {/* Contacts */}
      <div className="space-y-6">
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

      {/* Zavřít button at bottom */}
      <div className="pt-4">
        <GlowButton
          className="w-full py-4 text-xl uppercase text-black"
          glowColor="bg-orange-400"
          onClick={onClose}
        >
          Zavřít
        </GlowButton>
      </div>
    </div>
  );
};

export default ContactContent;
