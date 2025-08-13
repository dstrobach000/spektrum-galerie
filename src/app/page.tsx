"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Layout/Header";
import Gallery from "@/components/Layout/Gallery";
import Footer from "@/components/Layout/Footer";
import Modal from "@/components/BuildingBlocks/Modal/Modal";

import MenuContent from "@/components/Content/MenuContent";
import ExhibitionContent from "@/components/Content/ExhibitionContent";
import ContactContent from "@/components/Content/ContactContent";
import PressContent from "@/components/Content/PressContent";
import Upcoming from "@/components/BuildingBlocks/Labels/Upcoming";
import MenuButton from "@/components/BuildingBlocks/Buttons/MenuButton";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [contactsOpen, setContactsOpen] = useState(false);
  const [contactsSource, setContactsSource] = useState<"menu" | "main">("main");
  const [pressOpen, setPressOpen] = useState(false);
  const [pressSource, setPressSource] = useState<"menu" | "main">("main");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlaySource, setOverlaySource] = useState<"menu" | "main">("main");

  const handleContactClick = () => {
    setContactsOpen(true);
    setContactsSource("menu");
    setMenuOpen(false);
  };
  const handlePressClick = () => {
    setPressOpen(true);
    setPressSource("menu");
    setMenuOpen(false);
  };
  const handleCurrentExhibitionClick = () => {
    setOverlayOpen(true);
    setOverlaySource("menu");
    setMenuOpen(false);
  };

  const handleFooterContact = () => {
    setContactsOpen(true);
    setContactsSource("main");
  };
  const handleFooterPress = () => {
    setPressOpen(true);
    setPressSource("main");
  };
  const handleGalleryExhibition = () => {
    setOverlayOpen(true);
    setOverlaySource("main");
  };

  const handleContactClose = () => {
    setContactsOpen(false);
    if (contactsSource === "menu") setMenuOpen(true);
  };
  const handlePressClose = () => {
    setPressOpen(false);
    if (pressSource === "menu") setMenuOpen(true);
  };
  const handleExhibitionClose = () => {
    setOverlayOpen(false);
    if (overlaySource === "menu") setMenuOpen(true);
  };

  const footerRef = useRef<HTMLElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const isMobile = () => window.innerWidth <= 768;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMobile()) {
          setShowScrollButton(entry.isIntersecting);
        } else {
          setShowScrollButton(false);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = footerRef.current;

    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      {!menuOpen && <MenuButton onClick={() => setMenuOpen(true)} />}

      <div className="flex-grow">
        <Header />

        <Upcoming
          artist="Marie Hrachovcová"
          exhibition="Atlas neznámých květin"
          date="17. 6. - 31. 8. 2025"
          vernissage="Vernisáž 16. 6. 2025"
          link="https://www.instagram.com/mariehrachovcova_/"
        />

        <Gallery onOverlayOpen={handleGalleryExhibition} />
      </div>

      <Footer
        onContactClick={handleFooterContact}
        onPressClick={handleFooterPress}
        ref={footerRef}
      />

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

      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)} closeOnBackdropClick={false}>
        <MenuContent
          onClose={() => setMenuOpen(false)}
          onContactClick={handleContactClick}
          onPressClick={handlePressClick}
          onCurrentExhibitionClick={handleCurrentExhibitionClick}
        />
      </Modal>

      <Modal
        isOpen={contactsOpen}
        onClose={handleContactClose}
        closeOnBackdropClick={false}
      >
        <ContactContent />
      </Modal>

      <Modal
        isOpen={overlayOpen}
        onClose={handleExhibitionClose}
        closeOnBackdropClick={false}
      >
        <ExhibitionContent />
      </Modal>

      <Modal
        isOpen={pressOpen}
        onClose={handlePressClose}
        closeOnBackdropClick={false}
      >
        <PressContent />
      </Modal>
    </main>
  );
}
