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

  // Debug logging
  console.log("Upcoming exhibition data:", upcoming);

  // 👇 Hardcode vernissage string here instead of using Sanity value
  const manualVernissage = "Vernisáž: 10. 10. 2025 v 18:00";

  return (
    <Upcoming
      artist={upcoming.artist}
      exhibition={upcoming.exhibition}
      date={formatUpcomingRange(upcoming.startDate, upcoming.endDate)}
      vernissage={manualVernissage} // <— using manual string
      link={upcoming.link}
    />
  );
}
