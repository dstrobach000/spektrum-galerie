"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import ExhibitionContent from "@/components/Content/ExhibitionContent";
import Footer from "@/components/Layout/Footer";
import { useUpdateTitle } from "@/components/TitleSetter";
import type { Exhibition } from "@/types/Exhibition";

/**
 * Always closes to "/", and re-opens when you navigate
 * to any /exhibition/* path (even from cache).
 */
export default function ExhibitionModalClient({
  exhibition,
}: {
  exhibition: Exhibition | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(true);
  const [cameFromApp, setCameFromApp] = useState(false);

  // Update title when exhibition data is available
  const title = exhibition ? `${exhibition.artist} — ${exhibition.title} | Spektrum galerie` : "Výstava | Spektrum galerie";
  useUpdateTitle(title);

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

  // Also update title when pathname changes to ensure it's set correctly
  useEffect(() => {
    // Only set title on client side to prevent hydration mismatches
    if (typeof window === 'undefined') return;
    
    if (pathname?.startsWith("/exhibition") && exhibition) {
      const title = `${exhibition.artist} — ${exhibition.title} | Spektrum galerie`;
      document.title = title;
    }
  }, [pathname, exhibition]);

  // Re-enable the modal whenever we (re)enter an exhibition route
  useEffect(() => {
    if (pathname?.startsWith("/exhibition")) setOpen(true);
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false); // hide immediately
    if (cameFromApp) {
      router.back(); // then navigate back to previous page
    } else {
      router.push("/", { scroll: false }); // then navigate home
    }
  }, [router, cameFromApp]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      {exhibition ? (
        <ExhibitionContent exhibition={exhibition} />
      ) : (
        <div className="p-6">Exhibition not found.</div>
      )}
      <Footer noPadding={true} />
    </Modal>
  );
}
