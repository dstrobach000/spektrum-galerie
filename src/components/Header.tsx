"use client";

import React from "react";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const Header = () => {
  return (
    <section className="px-6 sm:px-10 py-6">
      <div className="border border-black rounded-xl p-6 space-y-6">
        {/* Main content (Logo + Texts) */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-10">
          {/* Logo only */}
          <div className="mt-2 sm:mt-0 sm:order-1 relative space-y-4">
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
                Spektrum galerie je experimentálním polem pro zkoumání rozmanitých forem současného umění. V kontextu mezioborových přesahů současného umění je koncepce výstavního programu protkána všemi uměleckými médii včetně zájmu o možnosti vystavování zvuku. Přejeme si vytvářet a iniciovat nové formy aktivit a přístupů v organismu galerijní platformy a zprostředkovávat je veřejnosti naší činností.
              </p>
            </div>
            <div className="border border-black rounded-xl p-4">
              <p className="font-light">
                Spektrum gallery is an experimental space for investigating diverse forms of contemporary art. Similar to the interdisciplinary overlap characteristic for the current art scene, the gallery’s programme is polycentric and open to all artistic mediums. A particular focus of the space is in providing opportunities for production and exhibition of sound performances and installations. We wish to create and initiate new forms of activities and approaches within the organism of the gallery platform and to convey them to the public through our activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
