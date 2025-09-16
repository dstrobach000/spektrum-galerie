"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import PressContent from "@/components/Content/PressContent";
import { useUpdateTitle } from "@/components/TitleSetter";
import type { PressLinkUI } from "@/types/Press";

type Props = {
  links: PressLinkUI[];
};

export default function PressModalClient({ links }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  // Update title for press page
  useUpdateTitle("Ke stažení | Spektrum galerie");

  // Reopen when navigating back to /press (handles App Router cache)
  useEffect(() => {
    if (pathname === "/press") setOpen(true);
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false);
    router.push("/", { scroll: false });
  }, [router]);

  return (
    <Modal isOpen={open} onClose={handleClose} closeOnBackdropClick={false}>
      <PressContent links={links} />
    </Modal>
  );
}
