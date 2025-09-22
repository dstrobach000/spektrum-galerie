"use client";

import React from "react";
import Upcoming from "@/components/BuildingBlocks/Labels/Upcoming";
import { formatUpcomingRange, formatUpcomingVernissage } from "@/utils/dateFormat";

type UpcomingExhibition = {
  artist: string;
  exhibition: string;
  startDate: string;
  endDate: string;
  vernissageDate: string;
  link?: string;
};


type UpcomingWrapperProps = {
  upcoming: UpcomingExhibition | null;
};

export default function UpcomingWrapper({ upcoming }: UpcomingWrapperProps) {
  if (!upcoming) return null;

  // Debug logging to see what data we're getting
  console.log('Upcoming exhibition data:', {
    artist: upcoming.artist,
    exhibition: upcoming.exhibition,
    startDate: upcoming.startDate,
    endDate: upcoming.endDate,
    vernissageDate: upcoming.vernissageDate,
    link: upcoming.link
  });

  return (
    <Upcoming
      artist={upcoming.artist}
      exhibition={upcoming.exhibition}
      date={formatUpcomingRange(upcoming.startDate, upcoming.endDate)}
      vernissage={formatUpcomingVernissage(upcoming.vernissageDate)}
      link={upcoming.link}
    />
  );
}
