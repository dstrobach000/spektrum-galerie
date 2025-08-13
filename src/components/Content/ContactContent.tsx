"use client";

import React from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";

const ContactContent = () => (
  <div className="max-w-4xl mx-auto">
    <div className="border border-black rounded-xl p-6 relative">
      <div className="border border-black rounded-full w-full leading-none min-h-[200px] md:min-h-0 flex items-center justify-center mb-6 aspect-[3/1]">
        <RotatingLogo3D
          src="/3D/logo.glb"
          speed={10}
          className="block w-full h-auto"
        />
      </div>
      <div className="mt-2 sm:mt-0 relative">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="border border-black rounded-xl p-6 flex-1">
            <p className="font-light">Spektrum galerie</p>
            <p className="font-light">Štefánikova 95/24</p>
            <p className="font-light mb-4">Brno 602 00</p>
            <div className="flex justify-center">
              <GlowButton
                className="w-auto py-2 text-sm font-light text-black"
                glowColor="bg-[#a3f730]"
                floating={false}
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
          </div>
          <div className="border border-black rounded-xl p-6 flex-1">
            <p className="font-light">Fléda Art z.s.</p>
            <p className="font-light">Cejl 514/46, Zábrdovice</p>
            <p className="font-light">602 00 Brno</p>
            <p className="font-light">IČ: 27002977</p>
          </div>
        </div>
        <p className="text-center text-lg font-light mb-4">
          Otevírací doba galerie se odvíjí od formátu jednotlivých výstavy.
          Aktuální informace najdete na našem Instagramu. Návštěvu mimo
          otevírací dobu je možné domluvit individuálně.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <GlowButton
            className="px-6 py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            floating={false}
            onClick={() =>
              window.open("https://facebook.com/spektrumgalerie", "_blank")
            }
          >
            Facebook
          </GlowButton>
          <GlowButton
            className="px-6 py-2 text-sm font-light text-black"
            glowColor="bg-[#a3f730]"
            floating={false}
            onClick={() =>
              window.open("https://instagram.com/spektrum___galerie/", "_blank")
            }
          >
            Instagram
          </GlowButton>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="border border-black rounded-xl p-6 flex-1">
            <p className="font-light">Adéla Petříčková</p>
            <p className="font-light mb-4">Kurátorka</p>
            <div className="flex justify-center">
              <GlowButton
                className="w-auto py-2 text-sm font-light text-black"
                glowColor="bg-[#a3f730]"
                floating={false}
                onClick={() =>
                  (window.location.href = "mailto:adela@spektrumgalerie.cz")
                }
              >
                adela@spektrumgalerie.cz
              </GlowButton>
            </div>
          </div>
          <div className="border border-black rounded-xl p-6 flex-1">
            <p className="font-light">Kateřina Pražáková</p>
            <p className="font-light mb-4">PR</p>
            <div className="flex justify-center">
              <GlowButton
                className="w-auto py-2 text-sm font-light text-black"
                glowColor="bg-[#a3f730]"
                floating={false}
                onClick={() =>
                  (window.location.href = "mailto:katerina@spektrumgalerie.cz")
                }
              >
                katerina@spektrumgalerie.cz
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-6"></div>
  </div>
);

export default ContactContent;
