import type { PortableTextBlock } from "@portabletext/types";

export type ImageAsset = { asset: { url: string } };

export type VideoAsset = {
  asset: string; // URL string directly
};

export type Exhibition = {
  _id: string;
  slug: string;
  title: string;
  artist: string;
  isOneDayEvent?: boolean;
  startDate?: string;
  endDate?: string;
  intro?: PortableTextBlock[];
  mainText?: PortableTextBlock[];
  bio?: PortableTextBlock[];
  namecard?: { role: string; name: string }[];
  poster?: { asset: { url: string } };
  landscapeImages?: ImageAsset[];
  portraitImages?: ImageAsset[];
  landscapeVideos?: VideoAsset[];
  portraitVideos?: VideoAsset[];
};
