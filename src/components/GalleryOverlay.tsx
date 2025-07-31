"use client";

import React from "react";
import RotatingLogo from "@/components/Logo/RotatingLogo";
import GalleryNav from "./GalleryNav";
import NameCard from "./NameCard";
import CuratorialText from "./CuratorialText";
import PhotoGallery from "./PhotoGallery";
import GalleryOverlayHeader from "./GalleryOverlayHeader";

const GalleryOverlay = () => (
  <div className="max-w-4xl mx-auto">
    <div className="border border-black rounded-xl p-6 relative">
      <div className="mt-2 sm:mt-0 relative space-y-4">
        {/* Logo */}
        <div className="border border-black rounded-xl w-full leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            speed={10}
            className="block w-full h-auto"
          />
        </div>
        {/* Nav buttons above header */}
        <GalleryNav onNext={() => {}} onPrev={() => {}} />
        {/* Overlay header */}
        <GalleryOverlayHeader
          artist="Marie Vařeková"
          exhibitionName="Weary Shout"
          date="22. 5. – 11. 6. 2025"
        />
        {/* NameCard */}
        <NameCard
          curator="Adéla Petříčková"
          promo="Kateřina Pražáková"
          install="Jakub Nečas"
          photo="Barbora Cicoňová"
          thanks="Anna Maria Matulová, Spektrum Bar, Kateřina Procházková, David Štrobach, Fléda"
        />
        {/* CuratorialText */}
        <CuratorialText>
          <p className="mb-4 border border-black rounded-xl p-4 bg-white text-lg">
            Výstava Weary Shout představuje tvorbu Marie Vařekové jako citlivou, intuitivně vedenou odpověď na každodenní tlak neustálého rozhodování a vnějších podnětů, které mohou v člověku zanechávat pocit hlubokého vyčerpání. Namísto hledání narativu otevírá liminální prostor, ve kterém rudé rámy v ostrém kontrastu s monochromními plochami vytváří na straně jedné hraniční pásmo mezi vnějším světem a vnitřním stavem a na straně druhé uzavírají vizuální rezidua vnitřního napětí. Monochromy nenabízejí záchytné body, ale otevírají portály, kde se nejednoznačnost stává zcela konkrétním zážitkem – introspektivní a znejišťující stav mezi orientací a dezorientací.
          </p>
          <p className="mb-4 p-4 bg-white text-xl text-center">
            Obrazy, které nejsou vytvořené kvůli reprezentaci, ale kvůli zachycení pocitu, rytmu, trvání. Jako stopy, které zůstávají po pohybu, jako vizuální ekvivalent pauzy mezi neustálým tokem informací nebo jako prostor pro dech mezi jednotlivými výkřiky.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:gap-4 md:items-stretch">
            <div className="md:w-1/2 h-full flex flex-col">
              <p className="border border-black rounded-xl p-4 bg-white text-base flex-1 m-0">
                Marie Vařeková je umělkyně, scénografka a kurátorka působící v Brně, vychází z osobní zkušenosti, fyzické práce a každodenního napětí. Zajímá se o to, co znamená být umělkyní pracující třídy. Její práce často tematizuje únavu a úzkost a pohybuje se mezi malbou, performancí, instalací a objektem. Záměrně se vzdaluje od narativní přímočarosti – místo toho nabízí otevřený prostor vnitřního napětí i tiše kladeného odporu. Vystudovala Divadelní fakultu Akademie múzických umění v Praze a v současnosti pokračuje ve studiu malby na Fakultě výtvarných umění VUT v Brně.
              </p>
            </div>
            <div className="md:w-1/2 flex bg-white p-0">
              <img
                src="/images/weary_shout/weary_shout_10.jpg"
                alt="Exhibition key visual"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </CuratorialText>
        {/* PhotoGallery */}
        <PhotoGallery />
      </div>
    </div>
    <div className="h-8"></div>
  </div>
);

export default GalleryOverlay;
