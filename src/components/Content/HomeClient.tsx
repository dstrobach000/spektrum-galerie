"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
// import MenuContent from "@/components/Content/MenuContent"; // No longer needed
import ContactContent from "@/components/Content/ContactContent";
import MenuButton from "@/components/BuildingBlocks/Buttons/MenuButton";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import Footer from "@/components/Layout/Footer";

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
  contact: Contact | null;
};


export default function HomeClient({ contact }: HomeClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isContactRoute, setIsContactRoute] = useState(false);
  const [isMenuRoute, setIsMenuRoute] = useState(false);

  // Set route states after mount to prevent hydration mismatch
  useEffect(() => {
    setIsContactRoute(pathname === "/kontakt");
    setIsMenuRoute(pathname === "/menu");
  }, [pathname]);

  // Check if any modal is open
  const isModalOpen = isContactRoute || pathname?.startsWith("/exhibition") || pathname === "/press" || pathname === "/privacy";

  // Contact modal in the home page (route-driven)
  const handleContactClose = () => {
    router.replace("/");
  };

  const footerRef = useRef<HTMLElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const isSmallScreen = () => window.innerWidth <= 900;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isSmallScreen()) setShowScrollButton(entry.isIntersecting);
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
      {!isMenuRoute && !isModalOpen && <MenuButton onClick={() => router.push("/menu", { scroll: false })} />}


      {showScrollButton && (
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
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


      {/* KONTAKT MODAL (route-driven) - only render if not on /kontakt route */}
      {pathname !== "/kontakt" && (
        <Modal
          isOpen={isContactRoute}
          onClose={handleContactClose}
          closeOnBackdropClick={false}
        >
          {contact && <ContactContent contact={contact} />}
        </Modal>
      )}

      {/* Footer with ref for scroll-to-top button */}
      <div className="max-w-4xl mx-auto w-full">
        <Footer ref={footerRef} />
      </div>
    </>
  );
}
