"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import PrivacyContent from "@/components/Content/PrivacyContent";
import Footer from "@/components/Layout/Footer";
import { useUpdateTitle } from "@/components/TitleSetter";

export default function PrivacyModalClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [cameFromApp, setCameFromApp] = useState(false);

  // Update title for privacy page
  useUpdateTitle("Zásady ochrany osobních údajů | Spektrum galerie");

  // Track if user came from within the app
  useEffect(() => {
    const referrer = document.referrer;
    const isFromApp = referrer && (
      referrer.includes('localhost:3000') || 
      referrer.includes('spektrum-galerie') ||
      referrer.includes('/menu')
    );
    setCameFromApp(!!isFromApp);
  }, []);

  // Re-open when navigating to /privacy again (handles App Router cache)
  useEffect(() => {
    if (pathname === "/privacy") setOpen(true);
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (cameFromApp) {
      router.back();
    } else {
      router.push("/", { scroll: false });
    }
  }, [router, cameFromApp]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      <PrivacyContent />
      <Footer noPadding={true} />
    </Modal>
  );
}
