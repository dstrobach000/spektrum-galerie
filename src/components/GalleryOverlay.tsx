"use client";

import React, { useState } from "react";
import RotatingLogo from "@/components/Logo/RotatingLogo";
import StickyGalleryNav from "./StickyGalleryNav";
import NameCard from "./NameCard";
import CuratorialText from "./CuratorialText";
import PhotoGallery from "./PhotoGallery";

const galleryImages = Array.from({ length: 10 }, (_, i) => `/images/weary_shout/weary_shout_${i + 1}.jpg`);

const GalleryOverlay = () => {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev + 1) % galleryImages.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="relative w-full min-h-screen">
      <StickyGalleryNav onNext={goNext} onPrev={goPrev} />
      <div className="max-w-4xl mx-auto">
        <div className="border border-black rounded-xl p-6 relative bg-white">
          <div className="relative space-y-4">
            {/* Logo */}
            <div className="border border-black rounded-xl w-full leading-none">
              <RotatingLogo
                src="/logos/spektrum_galerie.svg"
                speed={10}
                className="block w-full h-auto"
              />
            </div>
            {/* NameCard */}
            <NameCard
              exhibitionName="Weary Shout"
              artist="Marie Vařeková"
              date="22. 5. – 11. 6. 2025"
              curator="Adéla Petříčková"
              promo="Kateřina Pražáková"
              install="Jakub Nečas"
              photo="Barbora Cicoňová"
              thanks="Anna Maria Matulová, Spektrum Bar, Kateřina Procházková, David Štrobach, Fléda"
              keyImage="/images/weary_shout/weary_shout_10.jpg"
            />
            {/* CuratorialText */}
            <CuratorialText>
              <p className="mb-4 border border-black rounded-xl p-4 bg-white">
                Výstava Weary Shout představuje tvorbu Marie Vařekové jako citlivou, intuitivně vedenou odpověď na každodenní tlak neustálého rozhodování a vnějších podnětů, které mohou v člověku zanechávat pocit hlubokého vyčerpání. Namísto hledání narativu otevírá liminální prostor, ve kterém rudé rámy v ostrém kontrastu s monochromními plochami vytváří na straně jedné hraniční pásmo mezi vnějším světem a vnitřním stavem a na straně druhé uzavírají vizuální rezidua vnitřního napětí. Monochromy nenabízejí záchytné body, ale otevírají portály, kde se nejednoznačnost stává zcela konkrétním zážitkem – introspektivní a znejišťující stav mezi orientací a dezorientací.
              </p>
              <p className="mb-4 border border-black rounded-xl p-4 bg-white">
                Obrazy, které nejsou vytvořené kvůli reprezentaci, ale kvůli zachycení pocitu, rytmu, trvání. Jako stopy, které zůstávají po pohybu, jako vizuální ekvivalent pauzy mezi neustálým tokem informací nebo jako prostor pro dech mezi jednotlivými výkřiky.
              </p>
              <p className="border border-black rounded-xl p-4 bg-white">
                Marie Vařeková je umělkyně, scénografka a kurátorka působící v Brně, vychází z osobní zkušenosti, fyzické práce a každodenního napětí. Zajímá se o to, co znamená být umělkyní pracující třídy. Její práce často tematizuje únavu a úzkost a pohybuje se mezi malbou, performancí, instalací a objektem. Záměrně se vzdaluje od narativní přímočarosti – místo toho nabízí otevřený prostor vnitřního napětí i tiše kladeného odporu. Vystudovala Divadelní fakultu Akademie múzických umění v Praze a v současnosti pokračuje ve studiu malby na Fakultě výtvarných umění VUT v Brně.
              </p>
            </CuratorialText>
            {/* PhotoGallery */}
            <PhotoGallery
              images={galleryImages}
              current={current}
              goPrev={goPrev}
              goNext={goNext}
            />
          </div>
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
};

export default GalleryOverlay;
