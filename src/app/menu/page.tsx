import MenuModalClient from "@/components/Content/MenuModalClient";
import { sanityClient } from "@/sanity/client";

type SiteSettings = {
  showCurrentButton?: boolean;
};

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

const siteSettingsQuery = `
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]{
    showCurrentButton
  }
`;

// Enable ISR (Incremental Static Regeneration) with 60-second revalidation
export const revalidate = 60;

// Force dynamic rendering for immediate updates
export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const [latestExhibition, siteSettings] = await Promise.all([
    fetchLatestExhibition(),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  return (
    <MenuModalClient
      latestExhibition={latestExhibition}
      showCurrentButton={siteSettings?.showCurrentButton ?? true}
    />
  );
}
