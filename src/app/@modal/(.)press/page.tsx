// app/@modal/(..)press/page.tsx (Server Component)
import { sanityClient } from "@/sanity/client";
import PressModalClient from "@/components/Content/PressModalClient";
import type { PressDoc, PressLinkUI } from "@/types/Press";

// Keep this in sync with your full-page query
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

export default async function PressModalPage() {
  const data = await sanityClient.fetch<PressDoc>(query);

  const links: PressLinkUI[] =
    data?.links?.map((l) => ({
      label: l.label ?? "Untitled",
      href: l.url ?? l.fileUrl ?? "#",
    })) ?? [];

  return <PressModalClient links={links} />;
}
