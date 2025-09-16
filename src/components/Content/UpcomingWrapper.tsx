"use client";

import React from "react";
import Upcoming from "@/components/BuildingBlocks/Labels/Upcoming";

type UpcomingExhibition = {
  artist: string;
  exhibition: string;
  startDate: string;
  endDate: string;
  vernissageDate: string;
  link?: string;
};

// --- DATE HELPERS ---
function pad(n: number) {
  return n < 10 ? "0" + n : n;
}
function shortYear(date: Date) {
  return pad(date.getFullYear() % 100);
}
function formatRange(start?: string, end?: string) {
  if (!start || !end) return "";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()
  ) {
    return `${startDate.getDate()}. – ${endDate.getDate()}. ${
      endDate.getMonth() + 1
    }. ${shortYear(endDate)}`;
  } else {
    return `${startDate.getDate()}. ${startDate.getMonth() + 1}. ${shortYear(
      startDate
    )} – ${endDate.getDate()}. ${endDate.getMonth() + 1}. ${shortYear(
      endDate
    )}`;
  }
}
function formatVernissage(vernissage?: string) {
  if (!vernissage) return "";
  const date = new Date(vernissage);
  return `Vernisáž: ${date.getDate()}. ${date.getMonth() + 1}. ${shortYear(
    date
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
// ---

type UpcomingWrapperProps = {
  upcoming: UpcomingExhibition | null;
};

export default function UpcomingWrapper({ upcoming }: UpcomingWrapperProps) {
  if (!upcoming) return null;

  return (
    <Upcoming
      artist={upcoming.artist}
      exhibition={upcoming.exhibition}
      date={formatRange(upcoming.startDate, upcoming.endDate)}
      vernissage={formatVernissage(upcoming.vernissageDate)}
      link={upcoming.link}
    />
  );
}
