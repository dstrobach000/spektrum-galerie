import MenuModalClient from "@/components/Content/MenuModalClient";
import { sanityClient } from "@/sanity/client";

const fetchLatestExhibition = async () => {
  const exhibitions = await sanityClient.fetch(`
    *[_type == "exhibition"] | order(startDate desc) {
      _id,
      title,
      artist,
      "slug": slug.current,
      startDate,
      endDate
    }
  `);
  return exhibitions[0] || null;
};

// Enable ISR (Incremental Static Regeneration) with 60-second revalidation
export const revalidate = 60;

// Force dynamic rendering for immediate updates
export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const latestExhibition = await fetchLatestExhibition();
  return <MenuModalClient latestExhibition={latestExhibition} />;
}
