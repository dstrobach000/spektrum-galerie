// src/app/@modal/(.)press/page.tsx
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

export default async function PressModalPage() {
  const data = await sanityClient.fetch<PressDoc>(query);

  const links: PressLinkUI[] =
    data?.links?.map((l) => ({
      label: l.label ?? "Untitled",
      href: l.url ?? l.fileUrl ?? "#",
    })) ?? [];

  return <PressModalClient links={links} />;
}

export const metadata: Metadata = {
  title: "Ke stažení",
};
