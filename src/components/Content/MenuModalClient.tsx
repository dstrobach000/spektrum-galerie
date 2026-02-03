"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import MenuContent from "@/components/Content/MenuContent";

type Exhibition = {
  _id: string;
  title: string;
  artist: string;
  slug: string;
  startDate?: string;
  endDate?: string;
};

type MenuModalClientProps = {
  latestExhibition: Exhibition | null;
  showCurrentButton?: boolean;
};

export default function MenuModalClient({
  latestExhibition,
  showCurrentButton = true,
}: MenuModalClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuRoute, setIsMenuRoute] = useState(false);

  // Set route state after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMenuRoute(pathname === "/menu");
  }, [pathname]);

  const handleContactClick = () => {
    router.push("/kontakt", { scroll: false });
  };

  const handlePressClick = () => {
    router.push("/press", { scroll: false });
  };

  const handleCurrentExhibitionClick = () => {
    if (latestExhibition?.slug) {
      router.push(`/exhibition/${latestExhibition.slug}`, { scroll: false });
    }
  };

  const handleMenuClose = () => {
    router.push("/", { scroll: false });
  };

  return (
    <>
      {/* MENU OVERLAY - Route-driven */}
      <Modal
        isOpen={isMenuRoute}
        onClose={handleMenuClose}
        closeOnBackdropClick={false}
      >
        <MenuContent
          onClose={handleMenuClose}
          onContactClick={handleContactClick}
          onPressClick={handlePressClick}
          onCurrentExhibitionClick={handleCurrentExhibitionClick}
          showCurrentButton={showCurrentButton}
        />
      </Modal>
    </>
  );
}
