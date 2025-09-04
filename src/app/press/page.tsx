// app/press/page.tsx
import PressContent from "@/components/Content/PressContent";
import { sanityClient } from "@/sanity/client";
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

export default async function Page() {
  const data = await sanityClient.fetch<PressDoc>(query);

  const links: PressLinkUI[] =
    data?.links?.map((l) => ({
      label: l.label ?? "Untitled",
      href: l.url ?? l.fileUrl ?? "#",
    })) ?? [];

  return <PressContent links={links} />;
}
