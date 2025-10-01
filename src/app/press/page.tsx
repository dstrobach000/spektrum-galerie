// src/app/press/page.tsx (Server Component)
// Reuse the same modal client for direct URL visits, just like Kontakt.
import { sanityClient } from "@/sanity/client";
import type { Metadata } from "next";
import PressModalClient from "@/components/Content/PressModalClient";
import type { PressDoc, PressLinkUI } from "@/types/Press";

const query = `
*[_type == "press"][0]{
  title,
  links[]{
    label,
    note,
    "fileUrl": file.asset->url,
    url
  }
}
`;

// Enable ISR (Incremental Static Regeneration) with 60-second revalidation
export const revalidate = 60;

// Force dynamic rendering for immediate updates
export const dynamic = 'force-dynamic';

export default async function PressPage() {
  const data = await sanityClient.fetch<PressDoc>(query);

  const links: PressLinkUI[] =
    data?.links?.map((l) => ({
      label: l.label ?? "Untitled",
      href: l.url ?? l.fileUrl ?? "#",
    })) ?? [];

  // Render the modal client even on the direct page:
  return <PressModalClient links={links} />;
}

export const metadata: Metadata = {
  title: "Ke stažení",
};
