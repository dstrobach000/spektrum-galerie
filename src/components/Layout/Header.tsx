"use client";

import React from "react";
import RotatingLogo from "@/components/BuildingBlocks/Logo/RotatingLogo";
import ModelViewer from "@/components/BuildingBlocks/3D/ModelViewer";

const aspect = "aspect-[3/1]"; // Change ratio here if you want a bit taller or shorter

const Header = () => {
  return (
    <section className="px-6 sm:px-10 py-6" id="header">
      <div className="border border-black rounded-xl p-6 space-y-6">
        <div className={`
          grid gap-4
          grid-cols-1
          lg:grid-cols-2
          3xl:grid-cols-3
          items-start
        `}>
          {/* LEFT COL (logo + model stacked on 2col; logo only on 3col) */}
          <div className="flex flex-col space-y-4">
            {/* Logo always uses aspect ratio */}
            <div className={`border border-black rounded-full overflow-hidden p-4 w-full flex items-center justify-center ${aspect}`}>
              <RotatingLogo
                src="/logos/spektrum_galerie.svg"
                speed={10}
                className="w-full h-full"
              />
            </div>
            {/* Model under logo only on <3xl (not on 3col) */}
            <div className={`border border-black rounded-full overflow-hidden w-full flex items-center justify-center ${aspect} 3xl:hidden`}>
              <ModelViewer />
            </div>
          </div>
          {/* TEXTS */}
          <div className="flex flex-col items-start justify-center text-left space-y-4 w-full">
            <div className="border border-black rounded-xl overflow-hidden p-4 w-full">
              <p className="font-light">
                Spektrum galerie je experimentálním polem pro zkoumání rozmanitých forem současného umění. V kontextu mezioborových přesahů současného umění je koncepce výstavního programu protkána všemi uměleckými médii včetně zájmu o možnosti vystavování zvuku. Přejeme si vytvářet a iniciovat nové formy aktivit a přístupů v organismu galerijní platformy a zprostředkovávat je veřejnosti naší činností.
              </p>
            </div>
            <div className="border border-black rounded-xl overflow-hidden p-4 w-full">
              <p className="font-light">
                Spektrum gallery is an experimental space for investigating diverse forms of contemporary art. Similar to the interdisciplinary overlap characteristic for the current art scene, the gallery’s programme is polycentric and open to all artistic mediums. A particular focus of the space is in providing opportunities for production and exhibition of sound performances and installations. We wish to create and initiate new forms of activities and approaches within the organism of the gallery platform and to convey them to the public through our activities.
              </p>
            </div>
          </div>
          {/* MODEL in own col for 3col layout */}
          <div className={`border border-black rounded-xl overflow-hidden w-full flex items-center justify-center ${aspect} hidden 3xl:flex`}>
            <ModelViewer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
