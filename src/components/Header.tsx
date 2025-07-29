"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import RotatingLogo from "@/components/Logo/RotatingLogo";
import ModelViewer from "@/components/ModelViewer";

const Header = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoSize, setLogoSize] = useState<{ width: number; height: number } | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useLayoutEffect(() => {
    function updateSize() {
      if (logoRef.current) {
        const { offsetWidth, offsetHeight } = logoRef.current;
        setLogoSize(prev => {
          if (!prev || prev.width !== offsetWidth || prev.height !== offsetHeight) {
            return { width: offsetWidth, height: offsetHeight };
          }
          return prev;
        });
      }
      setWindowWidth(window.innerWidth);
    }
    updateSize();

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    function onResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 100);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Use custom 1500px breakpoint for 3 columns
  const is3Col = windowWidth >= 1500;
  const modelHeight = is3Col && logoSize?.height ? `${logoSize.height}px` : "auto";

  return (
    <section className="px-6 sm:px-10 py-6">
      <div className="border border-black rounded-xl p-6 space-y-6">
        <div className={`
          grid gap-8
          grid-cols-1
          lg:grid-cols-2
          min-[1500px]:grid-cols-3
          items-start
        `}>
          {/* LEFT COL (logo + model stacked on 2col; logo only on 3col) */}
          <div className="flex flex-col space-y-4">
            <div
              className="border border-black rounded-xl overflow-hidden p-4 w-full flex items-center justify-center"
              ref={logoRef}
            >
              <RotatingLogo
                src="/logos/spektrum_galerie.svg"
                width={600}
                speed={10}
                className="block w-full h-auto"
              />
            </div>
            {/* Model: under logo in left col for 2-col; logo only on 3col */}
            {!is3Col && (
              <div
                className="border border-black rounded-xl overflow-hidden p-4 w-full flex items-center justify-center"
                style={{
                  height: modelHeight,
                }}
              >
                <ModelViewer />
              </div>
            )}
          </div>
          {/* TEXTS (right col on 2col, right col on 3col) */}
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
          {is3Col && (
            <div
              className="border border-black rounded-xl overflow-hidden p-4 w-full flex items-center justify-center"
              style={{
                height: modelHeight,
                minHeight: "300px", // <-- only for is3Col!
              }}
            >
              <ModelViewer />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
