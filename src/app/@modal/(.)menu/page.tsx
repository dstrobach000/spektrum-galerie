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

export default async function MenuModalPage() {
  const latestExhibition = await fetchLatestExhibition();
  return <MenuModalClient latestExhibition={latestExhibition} />;
}
