"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import PrivacyContent from "@/components/Content/PrivacyContent";

export default function PrivacyModalClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  // Re-open when navigating to /privacy again (handles App Router cache)
  useEffect(() => {
    if (pathname === "/privacy") setOpen(true);
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false);
    router.push("/", { scroll: false });
  }, [router]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      <PrivacyContent />
    </Modal>
  );
}
