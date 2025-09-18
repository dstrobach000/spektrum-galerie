"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ExhibitionHeader from "@/components/Layout/Exhibition/ExhibitionHeader";
import { formatExhibitionDate } from "@/utils/dateFormat";

type ExhibitionInfo = {
  slug: string;
  artist: string;
  title: string;
  isOneDayEvent?: boolean;
  startDate?: string;
  endDate?: string;
};


export default function ExhibitionHeaderClient({
  currentSlug,
  artist,
  exhibitionName,
  startDate,
  endDate,
  isOneDayEvent,
}: {
  currentSlug: string;
  artist: string;
  exhibitionName: string;
  startDate?: string;
  endDate?: string;
  isOneDayEvent?: boolean;
}) {
  const [exhibitions, setExhibitions] = useState<ExhibitionInfo[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/exhibitions-list")
      .then((res) => res.json())
      .then((data) => setExhibitions(data))
      .catch(() => {});
  }, []);

  if (!exhibitions.length) {
    return (
      <ExhibitionHeader
        artist={artist}
        exhibitionName={exhibitionName}
        date={formatExhibitionDate(startDate, endDate, isOneDayEvent)}
      />
    );
  }

  const idx = exhibitions.findIndex((e) => e.slug === currentSlug);

  const goPrev = () => {
    const prevIdx = (idx - 1 + exhibitions.length) % exhibitions.length;
    router.push(`/exhibition/${exhibitions[prevIdx].slug}`);
  };
  const goNext = () => {
    const nextIdx = (idx + 1) % exhibitions.length;
    router.push(`/exhibition/${exhibitions[nextIdx].slug}`);
  };

  return (
    <ExhibitionHeader
      artist={artist}
      exhibitionName={exhibitionName}
        date={formatExhibitionDate(startDate, endDate, isOneDayEvent)}
      onPrev={goPrev}
      onNext={goNext}
    />
  );
}
