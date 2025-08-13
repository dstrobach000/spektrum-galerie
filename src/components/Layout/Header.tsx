"use client";

import React from "react";
import ModelViewer from "@/components/BuildingBlocks/3D/ModelViewer";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";

const aspect = "aspect-[3/1]";

const Header = () => {
  return (
    <section className="px-6 sm:px-10 py-6" id="header">
      <div className="border border-black rounded-xl p-6 grid gap-6">
        {/* ===== MOBILE + MEDIUM ===== */}
        <div
          className={`
            3xl:hidden
            grid gap-6
            grid-cols-1
            md:grid-cols-2
            items-start
          `}
        >
          {/* 1) Logo */}
          <div className={`border border-black rounded-full overflow-hidden w-full min-h-[150px] md:min-h-0 flex items-center justify-center ${aspect} order-1 md:order-1`}>
            <RotatingLogo3D src="/3D/logo.glb" speed={5} className="w-full h-full" />
          </div>

          {/* 2) Czech text */}
          <div className="border border-black rounded-xl overflow-hidden p-4 w-full order-2 md:order-3">
            <p className="font-light">
              Spektrum galerie je experimentálním polem pro zkoumání rozmanitých forem současného umění. V kontextu mezioborových
              přesahů současného umění je koncepce výstavního programu protkána všemi uměleckými médii včetně zájmu o možnosti
              vystavování zvuku. Přejeme si vytvářet a iniciovat nové formy aktivit a přístupů v organismu galerijní platformy a
              zprostředkovávat je veřejnosti naší činností.
            </p>
          </div>

          {/* 3) Model */}
          <div className={`border border-black rounded-full overflow-hidden w-full min-h-[150px] md:min-h-0 flex items-center justify-center ${aspect} order-3 md:order-2`}>
            <ModelViewer />
          </div>

          {/* 4) English text */}
          <div className="border border-black rounded-xl overflow-hidden p-4 w-full order-4 md:order-4">
            <p className="font-light">
              Spektrum gallery is an experimental space for investigating diverse forms of contemporary art. Similar to the interdisciplinary
              overlap characteristic for the current art scene, the gallery’s programme is polycentric and open to all artistic mediums.
              A particular focus of the space is in providing opportunities for production and exhibition of sound performances and
              installations. We wish to create and initiate new forms of activities and approaches within the organism of the gallery
              platform and to convey them to the public through our activities.
            </p>
          </div>
        </div>

        {/* ===== LARGE (>=3xl) — preserved styling & proportions ===== */}
        <div className="hidden 3xl:grid grid-cols-3 gap-6 items-start">
          {/* Left: Logo (pill, same wrapper as model) */}
          <div className={`border border-black rounded-full overflow-hidden p-4 w-full flex items-center justify-center ${aspect} col-start-1 col-end-2`}>
            <RotatingLogo3D src="/3D/logo.glb" speed={10} className="w-full h-full" />
          </div>

          {/* Middle: texts stacked */}
          <div className="flex flex-col items-start justify-center text-left space-y-6 w-full col-start-2 col-end-3">
            <div className="border border-black rounded-xl overflow-hidden p-4 w-full">
              <p className="font-light">
                Spektrum galerie je experimentálním polem pro zkoumání rozmanitých forem současného umění. V kontextu mezioborových
                přesahů současného umění je koncepce výstavního programu protkána všemi uměleckými médii včetně zájmu o možnosti
                vystavování zvuku. Přejeme si vytvářet a iniciovat nové formy aktivit a přístupů v organismu galerijní platformy a
                zprostředkovávat je veřejnosti naší činností.
              </p>
            </div>
            <div className="border border-black rounded-xl overflow-hidden p-4 w-full">
              <p className="font-light">
                Spektrum gallery is an experimental space for investigating diverse forms of contemporary art. Similar to the
                interdisciplinary overlap characteristic for the current art scene, the gallery’s programme is polycentric and
                open to all artistic mediums. A particular focus of the space is in providing opportunities for production and
                exhibition of sound performances and installations. We wish to create and initiate new forms of activities and
                approaches within the organism of the gallery platform and to convey them to the public through our activities.
              </p>
            </div>
          </div>

          {/* Right: Model (pill, identical wrapper to logo) */}
          <div className={`border border-black rounded-full overflow-hidden p-4 w-full flex items-center justify-center ${aspect} col-start-3 col-end-4`}>
            <ModelViewer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
