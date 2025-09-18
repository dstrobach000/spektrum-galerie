"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import ContactContent from "@/components/Content/ContactContent";
import Footer from "@/components/Layout/Footer";
import { useUpdateTitle } from "@/components/TitleSetter";
import type { Contact } from "@/types/Contact";

/**
 * Unify Kontakt with the same close behavior.
 */
export default function KontaktModalClient({ contact }: { contact: Contact }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  // Update title for kontakt page
  useUpdateTitle("Kontakty | Spektrum galerie");

  // Reopen when navigating back to /kontakt (handles App Router cache)
  useEffect(() => {
    if (pathname === "/kontakt") setOpen(true);
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false);
    router.push("/", { scroll: false });
  }, [router]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      <ContactContent contact={contact} />
      <Footer noPadding={true} />
    </Modal>
  );
}
