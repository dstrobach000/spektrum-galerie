// src/app/exhibition/[slug]/page.tsx (Server Component)
// Reuse the modal client so direct URL visits behave like in-app modals.
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

type Params = { params: { slug: string } };

export default async function ExhibitionPage({ params }: Params) {
  const exhibition = await sanityClient.fetch<Exhibition | null>(query, {
    slug: params.slug,
  });

  // Render the modal client even on the direct page:
  return <ExhibitionModalClient exhibition={exhibition} />;
}
