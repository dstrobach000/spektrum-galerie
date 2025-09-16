"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import MenuContent from "@/components/Content/MenuContent";
import ContactContent from "@/components/Content/ContactContent";
import MenuButton from "@/components/BuildingBlocks/Buttons/MenuButton";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

type SanityImage = { asset: { url: string } };

type Exhibition = {
  _id: string;
  title: string;
  artist: string;
  slug: string;
  startDate?: string;
  endDate?: string;
  vernissageDate?: string;
  landscapeImages?: SanityImage[];
  portraitImages?: SanityImage[];
  description?: string;
};

type ContactRole = { name: string; role: string; email: string };
type Contact = {
  address: string[];
  mapLink: string;
  invoiceDetails: string[];
  openingHours: string;
  facebook: string;
  instagram: string;
  roles: ContactRole[];
};

type HomeClientProps = {
  exhibitions: Exhibition[];
  contact: Contact | null;
};


export default function HomeClient({ exhibitions, contact }: HomeClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Unified "return-to-menu" flag for Kontakt, Press, Exhibition
  // Values: 'none' | 'kontakt' | 'press' | 'exhibition'
  const [returnToMenu, setReturnToMenu] = useState<
    "none" | "kontakt" | "press" | "exhibition"
  >("none");

  const router = useRouter();
  const pathname = usePathname();
  const isContactRoute = pathname === "/kontakt";

  // When we come back to '/', reopen the Menu if we started from it
  useEffect(() => {
    if (pathname === "/" && returnToMenu !== "none") {
      setMenuOpen(true);
      setReturnToMenu("none");
    }
  }, [pathname, returnToMenu]);


  // --- OPENERS (from menu) ---
  const handleMenuContactClick = () => {
    setReturnToMenu("kontakt");
    setMenuOpen(false);
    router.push("/kontakt", { scroll: false });
  };

  const handleCurrentExhibitionClick = () => {
    const slug = exhibitions[0]?.slug;
    if (!slug) return;
    setReturnToMenu("exhibition");
    setMenuOpen(false);
    router.push(`/exhibition/${slug}`, { scroll: false });
  };

  const handleMenuPressClick = () => {
    setReturnToMenu("press");
    setMenuOpen(false);
    router.push("/press", { scroll: false });
  };

  // Contact modal in the home page (route-driven)
  // Keep your safe-close logic, and make it use the unified flag
  const handleContactClose = () => {
    const canGoBack =
      typeof window !== "undefined" && (window.history.state?.idx ?? 0) > 0;
    if (canGoBack) {
      router.back();
    } else {
      router.replace("/");
    }
    // The effect above will reopen the menu when we land on "/"
    // (no need to directly setMenuOpen(true) here)
  };

  const footerRef = useRef<HTMLElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const isMobile = () => window.innerWidth <= 768;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMobile()) setShowScrollButton(entry.isIntersecting);
        else setShowScrollButton(false);
      },
      { threshold: 0.1 }
    );
    const footerElement = footerRef.current;
    if (footerElement) observer.observe(footerElement);
    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {!menuOpen && <MenuButton onClick={() => setMenuOpen(true)} />}


      {showScrollButton && (
        <div className="fixed bottom-4 right-4 z-50 sm:hidden">
          <GlowButton
            onClick={scrollToTop}
            className="p-3 text-xl"
            glowColor="bg-[#a3f730]"
            floating
          >
            ^
          </GlowButton>
        </div>
      )}

      {/* MENU OVERLAY */}
      <Modal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        closeOnBackdropClick={false}
      >
        <MenuContent
          onClose={() => setMenuOpen(false)} // used only by #anchor items
          onContactClick={handleMenuContactClick}
          onPressClick={handleMenuPressClick}
          onCurrentExhibitionClick={handleCurrentExhibitionClick}
        />
      </Modal>

      {/* KONTAKT MODAL (route-driven) */}
      <Modal
        isOpen={isContactRoute}
        onClose={handleContactClose}
        closeOnBackdropClick={false}
      >
        {contact && <ContactContent contact={contact} />}
      </Modal>
    </>
  );
}
