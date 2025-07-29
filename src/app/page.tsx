// page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

import MenuContent from "@/components/MenuContent";
import GalleryOverlay from "@/components/GalleryOverlay";
import ContactContent from "@/components/ContactContent";
import PressContent from "@/components/PressContent";
import Upcoming from "@/components/Upcoming";
import GlowButton from "@/components/GlowButton";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Updated state for modal source tracking ---
  const [contactsOpen, setContactsOpen] = useState(false);
  const [contactsSource, setContactsSource] = useState<"menu" | "main">("main");
  const [pressOpen, setPressOpen] = useState(false);
  const [pressSource, setPressSource] = useState<"menu" | "main">("main");
  // ------------------------------------------------

  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      {/* Show MENU button only when menu is closed */}
      {!menuOpen && (
        <div className="fixed left-4 top-[7.5rem] z-50">
          <GlowButton onClick={() => setMenuOpen(true)} glowColor="bg-[#a3f730]">
            MENU
          </GlowButton>
        </div>
      )}

      <div className="flex-grow">
        <Header />

        <Upcoming
          artist="Marie Hrachovcová"
          exhibition="Atlas neznámých květin"
          date="17. 6. - 31. 8. 2025"
        />

        <Gallery onOverlayOpen={() => setOverlayOpen(true)} />
      </div>

      <Footer
        onContactClick={() => {
          setContactsSource("main");
          setContactsOpen(true);
        }}
        onPressClick={() => {
          setPressSource("main");
          setPressOpen(true);
        }}
      />

      {/* Menu modal */}
      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <MenuContent
          onClose={() => setMenuOpen(false)}
          onContactClick={() => {
            setContactsSource("menu");
            setContactsOpen(true);
            setMenuOpen(false);
          }}
          onPressClick={() => {
            setPressSource("menu");
            setPressOpen(true);
            setMenuOpen(false);
          }}
        />
      </Modal>

      {/* Contact modal */}
      <Modal
        isOpen={contactsOpen}
        onClose={() => {
          setContactsOpen(false);
          if (contactsSource === "menu") setMenuOpen(true);
        }}
      >
        <ContactContent
          onClose={() => {
            setContactsOpen(false);
            if (contactsSource === "menu") setMenuOpen(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        fullscreen
      >
        <GalleryOverlay />
      </Modal>

      <Modal
        isOpen={pressOpen}
        onClose={() => {
          setPressOpen(false);
          if (pressSource === "menu") setMenuOpen(true);
        }}
      >
        <PressContent
          onClose={() => {
            setPressOpen(false);
            if (pressSource === "menu") setMenuOpen(true);
          }}
        />
      </Modal>
    </main>
  );
}
