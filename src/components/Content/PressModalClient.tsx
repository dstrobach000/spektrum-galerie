"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import PressContent from "@/components/Content/PressContent";
import type { PressLinkUI } from "@/types/Press";

export default function PressModalClient({ links }: { links: PressLinkUI[] }) {
  const router = useRouter();
  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <PressContent links={links} />
    </Modal>
  );
}
