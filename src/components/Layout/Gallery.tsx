import React from "react";
import SlideShowCard from "@/components/BuildingBlocks/Slider/SlideShowCard";
import Link from "next/link";
import { formatExhibitionDate } from "@/utils/dateFormat";
import { imageSizes } from "@/utils/sanityImageUrl";

type Image = { asset: { url: string } };

type Exhibition = {
  _id: string;
  title: string;
  artist: string;
  slug: string;
  isOneDayEvent?: boolean;
  startDate?: string;
  endDate?: string;
  landscapeImages?: Image[];
  portraitImages?: Image[];
  poster?: Image; // Exhibition graphic/poster
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
    <section className="py-6 px-6 bg-white" id="gallery">
      <div className="grid gap-8 overflow-visible" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {exhibitions.map((exhibition, i) => (
          <Link
            href={`/exhibition/${exhibition.slug}`}
            scroll={false}
            key={exhibition._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SlideShowCard
              images={[
                ...(exhibition.landscapeImages?.map(img => imageSizes.thumbnail(img.asset.url)) || []),
                ...(exhibition.portraitImages?.map(img => imageSizes.thumbnail(img.asset.url)) || [])
              ].slice(0, 4)}
              buttonText={exhibition.title}
              author={exhibition.artist}
              date={formatExhibitionDate(exhibition.startDate, exhibition.endDate, exhibition.isOneDayEvent)}
              interval={2}
              onPillClick={onOverlayOpen}
              buttonClassName="inline-block px-6 py-2 text-sm font-light text-black"
              isCurrent={i === 0}
              exhibitionGraphic={exhibition.poster?.asset.url ? imageSizes.poster(exhibition.poster.asset.url) : undefined}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
