// src/app/@modal/(.)kontakt/page.tsx
import { sanityClient } from "@/sanity/client";
import KontaktModalClient from "@/components/Content/KontaktModalClient";

const query = `
  *[_type == "contact"][0]{
    address,
    mapLink,
    invoiceDetails,
    openingHours,
    facebook,
    instagram,
    roles[] {
      name,
      role,
      email
    }
  }
`;

export default async function KontaktModalPage() {
  const data = await sanityClient.fetch(query);

  // Pass only serializable data to a client wrapper (which owns onClose).
  return <KontaktModalClient contact={data} />;
}
