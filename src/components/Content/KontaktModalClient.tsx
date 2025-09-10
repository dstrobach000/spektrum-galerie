"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import ContactContent from "@/components/Content/ContactContent";
import type { Contact } from "@/types/Contact";

/**
 * Unify Kontakt with the same close behavior.
 */
export default function KontaktModalClient({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    router.push("/", { scroll: false });
  }, [router]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      <ContactContent contact={contact} />
    </Modal>
  );
}
