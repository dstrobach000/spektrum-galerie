"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import PressContent from "@/components/Content/PressContent";
import Footer from "@/components/Layout/Footer";
import { useUpdateTitle } from "@/components/TitleSetter";
import type { PressLinkUI } from "@/types/Press";

type Props = {
  links: PressLinkUI[];
};

export default function PressModalClient({ links }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [cameFromApp, setCameFromApp] = useState(false);

  // Update title for press page
  useUpdateTitle("Ke stažení | Spektrum galerie");

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

  // Reopen when navigating back to /press (handles App Router cache)
  useEffect(() => {
    if (pathname === "/press") setOpen(true);
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
      <PressContent links={links} />
      <Footer noPadding={true} />
    </Modal>
  );
}
