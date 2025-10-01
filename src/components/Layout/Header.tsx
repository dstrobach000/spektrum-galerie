"use client";

import React from "react";
import dynamic from "next/dynamic";

const BlueprintSlot = dynamic(() => import("@/components/BuildingBlocks/3D/BlueprintSlot"), {
  ssr: false,
  loading: () => (
    <div className="border border-black rounded-full overflow-hidden aspect-[3/1] w-full h-[150px] md:h-auto bg-white" />
  ),
});

const LogoSlot = dynamic(() => import("@/components/BuildingBlocks/Logo/LogoSlot"), {
  ssr: false,
  loading: () => (
    <div className="border border-black rounded-full overflow-hidden aspect-[3/1] w-full h-[150px] md:h-auto bg-white" />
  ),
});
import { fixCzechOrphansInString, fixEnglishOrphansInString } from "@/utils/czechOrphanFix";

const Header = () => {
  return (
    <section className="px-6 py-6 relative" id="header">
      <div className="border border-black rounded-xl p-6 grid gap-6">
        {/* ===== ALL SCREEN SIZES - 2 COLUMN LAYOUT ===== */}
        <div
          className={`
            grid gap-6
            grid-cols-1
            md:grid-cols-2
            items-start
          `}
        >
          {/* 1) Logo */}
          <div className={`order-1 md:order-1`}>
            <LogoSlot />
          </div>

          {/* 2) Czech text */}
          <div className="border border-black rounded-xl overflow-hidden p-4 w-full order-2 md:order-3">
            <p className="font-light">
              {fixCzechOrphansInString(
                "Spektrum galerie je experimentálním polem pro zkoumání rozmanitých forem současného umění. V kontextu mezioborových přesahů současného umění je koncepce výstavního programu protkána všemi uměleckými médii včetně zájmu o možnosti vystavování zvuku. Přejeme si vytvářet a iniciovat nové formy aktivit a přístupů v organismu galerijní platformy a zprostředkovávat je veřejnosti naší činností."
              )}
            </p>
          </div>

          {/* 3) Model */}
          <div className={`order-3 md:order-2`}>
            <BlueprintSlot />
          </div>

          {/* 4) English text */}
          <div className="border border-black rounded-xl overflow-hidden p-4 w-full order-4 md:order-4">
            <p className="font-light">
              {fixEnglishOrphansInString(
                "Spektrum gallery is an experimental space for investigating diverse forms of contemporary art. Similar to the interdisciplinary overlap characteristic for the current art scene, the gallery's programme is polycentric and open to all artistic mediums. A particular focus of the space is in providing opportunities for production and exhibition of sound performances and installations. We wish to create and initiate new forms of activities and approaches within the organism of the gallery platform and to convey them to the public through our activities."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
