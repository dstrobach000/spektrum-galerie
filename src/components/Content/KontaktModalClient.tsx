// src/components/Content/KontaktModalClient.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import ContactContent from "@/components/Content/ContactContent";

type ContactRole = { name: string; role: string; email: string };
type Contact = {
  address: string[];
  mapLink: string;
  invoiceDetails: string[];
  openingHours: string;
  facebook: string;
  instagram: string;
  roles: ContactRole[];
};

export default function KontaktModalClient({ contact }: { contact: Contact }) {
  const router = useRouter();
  return (
    <Modal isOpen={true} onClose={() => router.back()} closeOnBackdropClick={false}>
      <ContactContent contact={contact} />
    </Modal>
  );
}
