import KontaktModalClient from "@/components/Content/KontaktModalClient";
import { sanityClient } from "@/sanity/client";
import type { Metadata } from "next";

type ContactRole = {
  name: string;
  role: string;
  email: string;
};

type Contact = {
  address: string[];
  mapLink: string;
  invoiceDetails: string[];
  openingHours: string;
  facebook: string;
  instagram: string;
  roles: ContactRole[];
};

const contactQuery = `
  *[_type == "contact"][0]{
    address,
    mapLink,
    invoiceDetails,
    openingHours,
    facebook,
    instagram,
    roles[]{
      name,
      role,
      email
    }
  }
`;

export default async function KontaktPage() {
  const contact = await sanityClient.fetch<Contact | null>(contactQuery);

  if (!contact) {
    return <div>Contact information not found.</div>;
  }

  return <KontaktModalClient contact={contact} />;
}

export const metadata: Metadata = {
  title: "Kontakty",
};
