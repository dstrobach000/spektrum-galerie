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
  const [contactsOpen, setContactsOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [pressOpen, setPressOpen] = useState(false);

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      {/* ✅ Floating sticky MENU button */}
      <div className="fixed left-4 top-[7.5rem] z-50">
        <GlowButton onClick={() => setMenuOpen(true)} glowColor="bg-[#a3f730]">
          MENU
        </GlowButton>
      </div>

      {/* ✅ Floating sticky ZAVŘÍT button (only when menu is open) */}
      {menuOpen && (
        <div className="fixed left-4 top-[12.5rem] z-50">
          <GlowButton onClick={() => setMenuOpen(false)} glowColor="bg-orange-400">
            ZAVŘÍT
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
        onContactClick={() => setContactsOpen(true)}
        onPressClick={() => setPressOpen(true)}
      />

      {/* ✅ Menu modal */}
      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)} title="">
        <MenuContent onClose={() => setMenuOpen(false)} />
      </Modal>

      {/* ✅ Contact modal (title removed) */}
      <Modal isOpen={contactsOpen} onClose={() => setContactsOpen(false)} title="">
        <ContactContent onClose={() => setContactsOpen(false)} />
      </Modal>

      <Modal
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        title="Project Details"
        fullscreen
      >
        <GalleryOverlay />
      </Modal>

      <Modal isOpen={pressOpen} onClose={() => setPressOpen(false)} title="Press">
        <PressContent />
      </Modal>
    </main>
  );
}
