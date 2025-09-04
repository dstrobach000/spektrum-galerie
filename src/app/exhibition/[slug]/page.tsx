import ExhibitionContent from "@/components/Content/ExhibitionContent";
import { sanityClient } from "@/sanity/client";
import { Exhibition } from "@/types/Exhibition";

async function getExhibition(slug: string): Promise<Exhibition | null> {
  const data = await sanityClient.fetch(
    `
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
    `,
    { slug }
  );
  if (!data) return null;
  return data;
}

export default async function ExhibitionPage({
  params,
}: {
  params: { slug: string }
}) {
  const exhibition = await getExhibition(params.slug);

  if (!exhibition) {
    return <div>Exhibition not found.</div>;
  }

  return <ExhibitionContent exhibition={exhibition} />;
}
