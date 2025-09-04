"use client";

import {useEffect, useState} from "react";
import ContactContent from "@/components/Content/ContactContent";
import {sanityClient} from "@/sanity/client";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import type {Contact} from "@/types/Contact";

const contactQuery = `
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

export default function KontaktModal() {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient.fetch(contactQuery).then((data: Contact) => {
      if (!cancelled) setContact(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Modal isOpen={true} onClose={() => window.history.back()}>
      {contact ? <ContactContent contact={contact} /> : null}
    </Modal>
  );
}
