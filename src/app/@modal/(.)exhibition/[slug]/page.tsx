// src/app/@modal/(.)exhibition/[slug]/page.tsx
import ExhibitionModalClient from "@/components/Content/ExhibitionModalClient";
import { sanityClient } from "@/sanity/client";
import type { Exhibition } from "@/types/Exhibition";
import type { Metadata } from "next";

const query = `
  *[_type == "exhibition" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    title,
    artist,
    isOneDayEvent,
    startDate,
    endDate,
    portraitImages[]{asset->{url}},
    landscapeImages[]{asset->{url}},
           landscapeVideos[]{asset->{url}},
           portraitVideos[]{asset->{url}},
    poster{asset->{url}},
    intro,
    mainText,
    bio,
    namecard[]{role, name}
  }
`;

export default async function ExhibitionModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const exhibition = await sanityClient.fetch<Exhibition | null>(query, { slug });

  return <ExhibitionModalClient exhibition={exhibition} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ex = await sanityClient.fetch<Pick<Exhibition, "title" | "artist"> | null>(
    `*[_type == "exhibition" && slug.current == $slug][0]{ title, artist }`,
    { slug }
  );
  
  if (!ex) {
    return { title: "Exhibition" };
  }
  
  const title = `${ex.artist} — ${ex.title}`;
  return { title };
}
