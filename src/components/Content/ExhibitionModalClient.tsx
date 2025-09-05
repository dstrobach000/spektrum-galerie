// src/components/Content/ExhibitionModalClient.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import ExhibitionContent from "@/components/Content/ExhibitionContent";
import type { Exhibition } from "@/types/Exhibition";

export default function ExhibitionModalClient({
  exhibition,
}: {
  exhibition: Exhibition | null;
}) {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()} closeOnBackdropClick={false}>
      {exhibition ? (
        <ExhibitionContent exhibition={exhibition} />
      ) : (
        <div className="p-6">Exhibition not found.</div>
      )}
    </Modal>
  );
}
