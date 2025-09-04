"use client";

import React from "react";
import SlideShowCard from "@/components/BuildingBlocks/Slider/SlideShowCard";
import Link from "next/link";

type Image = { asset: { url: string } };

type Exhibition = {
  _id: string;
  title: string;
  artist: string;
  slug: string;
  startDate?: string;
  endDate?: string;
  landscapeImages?: Image[];
  portraitImages?: Image[];
  // videos omitted here intentionally
  description?: string;
};

const Gallery = ({
  exhibitions = [],
  onOverlayOpen,
}: {
  exhibitions: Exhibition[];
  onOverlayOpen?: () => void;
}) => {
  return (
    <section className="py-6 px-6 sm:px-10 bg-white" id="gallery">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 overflow-visible">
        {exhibitions.map((exhibition, i) => (
          <Link
            href={`/exhibition/${exhibition.slug}`}
            scroll={false}
            key={exhibition._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SlideShowCard
              images={[
                ...(exhibition.landscapeImages?.map(img => img.asset.url) || []),
                ...(exhibition.portraitImages?.map(img => img.asset.url) || [])
              ].slice(0, 10)}
              buttonText={exhibition.title}
              author={exhibition.artist}
              date={
                exhibition.startDate && exhibition.endDate
                  ? `${new Date(exhibition.startDate).toLocaleDateString("cs-CZ")} – ${new Date(exhibition.endDate).toLocaleDateString("cs-CZ")}`
                  : exhibition.startDate
                  ? new Date(exhibition.startDate).toLocaleDateString("cs-CZ")
                  : ""
              }
              interval={2}
              onPillClick={onOverlayOpen}
              buttonClassName="inline-block px-6 py-2 text-sm font-light text-black"
              isCurrent={i === 0}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
