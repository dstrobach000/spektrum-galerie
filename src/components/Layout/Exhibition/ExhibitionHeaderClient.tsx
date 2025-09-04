"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ExhibitionHeader from "@/components/Layout/Exhibition/ExhibitionHeader";

type ExhibitionInfo = {
  slug: string;
  artist: string;
  title: string;
  startDate?: string;
  endDate?: string;
};

function formatShortDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startDay = start.getDate();
    const startMonth = start.getMonth() + 1;
    const endDay = end.getDate();
    const endMonth = end.getMonth() + 1;
    const endYear = String(end.getFullYear()).slice(-2);

    if (startMonth === endMonth) {
      return `${startDay}. – ${endDay}. ${endMonth}. ${endYear}`;
    } else {
      return `${startDay}. ${startMonth}. – ${endDay}. ${endMonth}. ${endYear}`;
    }
  } else if (startDate) {
    const start = new Date(startDate);
    return `${start.getDate()}. ${start.getMonth() + 1}. ${String(start.getFullYear()).slice(-2)}`;
  } else {
    return "";
  }
}

export default function ExhibitionHeaderClient({
  currentSlug,
  artist,
  exhibitionName,
  startDate,
  endDate,
}: {
  currentSlug: string;
  artist: string;
  exhibitionName: string;
  startDate?: string;
  endDate?: string;
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
        date={formatShortDate(startDate, endDate)}
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
      date={formatShortDate(startDate, endDate)}
      onPrev={goPrev}
      onNext={goNext}
    />
  );
}
