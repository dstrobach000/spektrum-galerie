// src/app/@modal/(.)exhibition/[slug]/page.tsx
import ExhibitionModalClient from "@/components/Content/ExhibitionModalClient";
import { sanityClient } from "@/sanity/client";
import type { Exhibition } from "@/types/Exhibition";

const query = `
  *[_type == "exhibition" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    title,
    artist,
    startDate,
    endDate,
    vernissageDate,
    portraitImages[]{asset->{url}},
    landscapeImages[]{asset->{url}},
    landscapeVideos[]{ asset->{ url }, caption },
    portraitVideos[]{ asset->{ url }, caption },
    poster{asset->{url}},
    intro,
    mainText,
    bio,
    namecard[]{role, name}
  }
`;

export default async function ExhibitionModalPage(
  props: PageProps<"/exhibition/[slug]">
) {
  const { slug } = await props.params;

  const exhibition = await sanityClient.fetch<Exhibition | null>(query, { slug });

  return <ExhibitionModalClient exhibition={exhibition} />;
}
