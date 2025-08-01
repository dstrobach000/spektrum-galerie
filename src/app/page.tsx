"use client";

import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Gallery from "@/components/Layout/Gallery";
import Footer from "@/components/Layout/Footer";
import Modal from "@/components/BuildingBlocks/Modal/Modal";

import MenuContent from "@/components/Content/MenuContent";
import ExhibitionContent from "@/components/Content/ExhibitionContent"; // Renamed import
import ContactContent from "@/components/Content/ContactContent";
import PressContent from "@/components/Content/PressContent";
import Upcoming from "@/components/BuildingBlocks/Labels/Upcoming";
import MenuButton from "@/components/BuildingBlocks/Buttons/MenuButton";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Updated state for modal source tracking ---
  const [contactsOpen, setContactsOpen] = useState(false);
  const [contactsSource, setContactsSource] = useState<"menu" | "main">("main");
  const [pressOpen, setPressOpen] = useState(false);
  const [pressSource, setPressSource] = useState<"menu" | "main">("main");
  // ------------------------------------------------

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [gallerySource, setGallerySource] = useState<"menu" | "main">("main");

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      {!menuOpen && (
        <MenuButton onClick={() => setMenuOpen(true)} />
      )}

      <div className="flex-grow">
        <Header />

        <Upcoming
          artist="Marie Hrachovcová"
          exhibition="Atlas neznámých květin"
          date="17. 6. - 31. 8. 2025"
          link="https://www.instagram.com/mariehrachovcova_/"
        />

        <Gallery onOverlayOpen={() => {
          setGallerySource("main");
          setOverlayOpen(true);
        }} />
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
      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)} closeOnBackdropClick={false}>
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
          onCurrentExhibitionClick={() => {
            setGallerySource("menu");
            setOverlayOpen(true);
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
        closeOnBackdropClick={false}
      >
        <ContactContent />
      </Modal>

      {/* ExhibitionContent modal */}
      <Modal
        isOpen={overlayOpen}
        onClose={() => {
          setOverlayOpen(false);
          if (gallerySource === "menu") setMenuOpen(true);
        }}
        closeOnBackdropClick={false}
      >
        <ExhibitionContent />
      </Modal>

      {/* Press modal */}
      <Modal
        isOpen={pressOpen}
        onClose={() => {
          setPressOpen(false);
          if (pressSource === "menu") setMenuOpen(true);
        }}
        closeOnBackdropClick={false}
      >
        <PressContent />
      </Modal>
    </main>
  );
}
