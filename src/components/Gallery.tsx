// Gallery.tsx
"use client";

import React from "react";
import SlideShowCard from "@/components/Slider/SlideShowCard";

const Gallery = ({ onOverlayOpen }: { onOverlayOpen?: () => void }) => {
  const slideshowCards = [
    {
      images: Array.from({ length: 9 }, (_, i) => `/images/weary_shout/weary_shout_${i + 1}.jpg`),
      buttonText: "Weary Shout",
      author: "Marie Vařeková",
      date: "22. 5. - 11. 6. 2025",
    },
    {
      images: Array.from({ length: 8 }, (_, i) => `/images/volno_od_velkeho_sveta/volno_od_velkeho_sveta${i + 1}.jpg`),
      buttonText: "Volno od Velkého světa",
      author: "Kolektiv PYL",
      date: "14. 5. - 18. 5. 2025",
    },
    {
      images: Array.from({ length: 6 }, (_, i) => `/images/travnikar/travnikar${i + 1}.jpg`),
      buttonText: "Trávníkář",
      author: "Anežka Stupková, Nikola Šmeralová",
      date: "10.4. - 23. 4. 2025",
    },
    {
      images: Array.from({ length: 6 }, (_, i) => `/images/on_spectrum/on_spectrum${i + 1}.jpg`),
      buttonText: "On Spectrum",
      author: "Matyáš Maláč",
      date: "23. 1. - 2. 3. 2025",
    },
    {
      images: Array.from({ length: 8 }, (_, i) => `/images/crazy_fuga/crazy_fuga${i + 1}.jpg`),
      buttonText: "Crazy Fuga",
      author: "Fuga Collective",
      date: "17. 10. - 26. 11. 2024",
    },
    {
      images: Array.from({ length: 3 }, (_, i) => `/images/no_points/no_points${i + 1}.jpg`),
      buttonText: "Gob Gob presents No Points ",
      author: "Angel Dodov, Michael Nechvátal",
      date: "2. 5. - 4. 6. 2024",
    },
    {
      images: Array.from({ length: 6 }, (_, i) => `/images/salimeli/salimeli${i + 1}.jpg`),
      buttonText: "Salimeli",
      author: "Libuše Kopůncová, Michaela Nováková",
      date: "25. 7. 2024",
    },
    {
      images: Array.from({ length: 7 }, (_, i) => `/images/bodily_transformations/bodily_transformations${i + 1}.jpg`),
      buttonText: "Bodily Transformations",
      author: "Libuše Kopůncová, Kateřina Procházková",
      date: "13. 6. - 22. 8. 2024",
    },
    {
      images: ["/images/navsteva/navsteva1.jpg"],
      buttonText: "Návštěva",
      author: "Lucie Králíková",
      date: "2. 5. - 4. 6. 2024",
    },
    {
      images: Array.from({ length: 3 }, (_, i) => `/images/sound_performance/sound_performance${i + 1}.jpg`),
      buttonText: "Sound Performance",
      author: "Maria Komarova",
      date: "25. 4. 2024",
    },
  ];

  return (
    <section className="px-6 sm:px-10 py-12 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 overflow-visible">
        {slideshowCards.map((card, i) => (
          <SlideShowCard
            key={i}
            images={card.images}
            buttonText={card.buttonText}
            author={card.author}
            date={card.date}
            interval={1}
            onPillClick={onOverlayOpen}
            buttonClassName="inline-block px-6 py-2 text-sm font-light text-black animate-float-pulse"
            isCurrent={card.buttonText === "Weary Shout"} // <-- set to your running exhibition
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
