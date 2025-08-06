"use client";

import React, { useState } from "react";
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // track *source* of modal opening
  const [contactsOpen, setContactsOpen] = useState(false);
  const [contactsSource, setContactsSource] = useState<"menu" | "main">("main");
  const [pressOpen, setPressOpen] = useState(false);
  const [pressSource, setPressSource] = useState<"menu" | "main">("main");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlaySource, setOverlaySource] = useState<"menu" | "main">("main");

  // Menu handlers - pass "menu" as the source
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

  // Footer and elsewhere: pass "main" as the source
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

  // On close: if opened from menu, reopen menu
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

        <Gallery onOverlayOpen={handleGalleryExhibition} />
      </div>

      <Footer
        onContactClick={handleFooterContact}
        onPressClick={handleFooterPress}
      />

      {/* Menu modal */}
      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)} closeOnBackdropClick={false}>
        <MenuContent
          onClose={() => setMenuOpen(false)}
          onContactClick={handleContactClick}
          onPressClick={handlePressClick}
          onCurrentExhibitionClick={handleCurrentExhibitionClick}
        />
      </Modal>

      {/* Contact modal */}
      <Modal
        isOpen={contactsOpen}
        onClose={handleContactClose}
        closeOnBackdropClick={false}
      >
        <ContactContent />
      </Modal>

      {/* ExhibitionContent modal */}
      <Modal
        isOpen={overlayOpen}
        onClose={handleExhibitionClose}
        closeOnBackdropClick={false}
      >
        <ExhibitionContent />
      </Modal>

      {/* Press modal */}
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
