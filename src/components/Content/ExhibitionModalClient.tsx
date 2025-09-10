"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import ExhibitionContent from "@/components/Content/ExhibitionContent";
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

  // Re-enable the modal whenever we (re)enter an exhibition route
  useEffect(() => {
    if (pathname?.startsWith("/exhibition")) setOpen(true);
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false); // hide immediately
    router.push("/", { scroll: false }); // then navigate home
  }, [router]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      {exhibition ? (
        <ExhibitionContent exhibition={exhibition} />
      ) : (
        <div className="p-6">Exhibition not found.</div>
      )}
    </Modal>
  );
}
