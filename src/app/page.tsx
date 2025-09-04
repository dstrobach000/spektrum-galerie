"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Layout/Header";
import Gallery from "@/components/Layout/Gallery";
import Footer from "@/components/Layout/Footer";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import MenuContent from "@/components/Content/MenuContent";
import ContactContent from "@/components/Content/ContactContent";
import PressContent from "@/components/Content/PressContent";
import Upcoming from "@/components/BuildingBlocks/Labels/Upcoming";
import MenuButton from "@/components/BuildingBlocks/Buttons/MenuButton";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { sanityClient } from "@/sanity/client";

type SanityImage = {
  asset: { url: string };
};

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

type UpcomingExhibition = {
  artist: string;
  exhibition: string;
  startDate: string;
  endDate: string;
  vernissageDate: string;
  link?: string;
};

// ---- Contact Types ----
type ContactRole = {
  name: string;
  role: string;
  email: string;
};
type Contact = {
  address: string[];
  mapLink: string;
  invoiceDetails: string[];
  openingHours: string;
  facebook: string;
  instagram: string;
  roles: ContactRole[];
};
// ----

const fetchExhibitions = async (): Promise<Exhibition[]> => {
  return await sanityClient.fetch(`
    *[_type == "exhibition"] | order(startDate desc) {
      _id,
      title,
      artist,
      "slug": slug.current,
      startDate,
      endDate,
      vernissageDate,
      landscapeImages[]{ asset->{ url } },
      portraitImages[]{ asset->{ url } },
      landscapeVideos[]{ asset->{ url }, caption },
      portraitVideos[]{ asset->{ url }, caption },
      description
    }
  `);
};

const contactQuery = `
  *[_type == "contact"][0]{
    address,
    mapLink,
    invoiceDetails,
    openingHours,
    facebook,
    instagram,
    roles[] {
      name,
      role,
      email
    }
  }
`;

// --- UPCOMING EXHIBITION QUERY ---
const upcomingQuery = `
  *[_type == "upcomingExhibition"][0]{
    artist,
    exhibition,
    startDate,
    endDate,
    vernissageDate,
    link
  }
`;

// --- DATE FORMATTING HELPERS ---
function pad(n: number) {
  return n < 10 ? "0" + n : n;
}
function shortYear(date: Date) {
  return pad(date.getFullYear() % 100);
}
function formatRange(start?: string, end?: string) {
  if (!start || !end) return "";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()
  ) {
    // Same month and year: "14. – 18. 5. 25"
    return `${startDate.getDate()}. – ${endDate.getDate()}. ${endDate.getMonth() + 1}. ${shortYear(endDate)}`;
  } else {
    // "14. 5. 25 – 18. 6. 25"
    return `${startDate.getDate()}. ${startDate.getMonth() + 1}. ${shortYear(startDate)} – ${endDate.getDate()}. ${endDate.getMonth() + 1}. ${shortYear(endDate)}`;
  }
}
function formatVernissage(vernissage?: string) {
  if (!vernissage) return "";
  const date = new Date(vernissage);
  return `Vernisáž: ${date.getDate()}. ${date.getMonth() + 1}. ${shortYear(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
// ---

export default function Home() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  useEffect(() => { fetchExhibitions().then(setExhibitions); }, []);

  // --- Fetch contact data ---
  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => {
    sanityClient.fetch(contactQuery).then(setContact);
  }, []);
  // ---

  // --- Fetch UPCOMING exhibition ---
  const [upcoming, setUpcoming] = useState<UpcomingExhibition | null>(null);
  useEffect(() => {
    sanityClient.fetch(upcomingQuery).then(setUpcoming);
  }, []);
  // ---

  const [menuOpen, setMenuOpen] = useState(false);
  const [contactsSource, setContactsSource] = useState<"menu" | "main">("main");
  const [pressOpen, setPressOpen] = useState(false);
  const [pressSource, setPressSource] = useState<"menu" | "main">("main");

  const router = useRouter();
  const pathname = usePathname();

  // Modal routing: open contact modal if on /kontakt
  const isContactRoute = pathname === "/kontakt";

  const handleContactClick = () => {
    setContactsSource("main");
    router.push("/kontakt", { scroll: false });
  };

  // For menu contact
  const handleMenuContactClick = () => {
    setContactsSource("menu");
    setMenuOpen(false);
    router.push("/kontakt", { scroll: false });
  };

  const handleContactClose = () => {
    router.back();
    if (contactsSource === "menu") setMenuOpen(true);
  };

  // PRESS modal (unchanged)
  const handlePressClick = () => {
    setPressOpen(true);
    setPressSource("menu");
    setMenuOpen(false);
  };
  const handleFooterPress = () => {
    setPressOpen(true);
    setPressSource("main");
  };
  const handlePressClose = () => {
    setPressOpen(false);
    if (pressSource === "menu") setMenuOpen(true);
  };

  const handleCurrentExhibitionClick = () => {};

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
      }, { threshold: 0.1 }
    );
    const footerElement = footerRef.current;
    if (footerElement) observer.observe(footerElement);
    return () => { if (footerElement) observer.unobserve(footerElement); };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      {!menuOpen && <MenuButton onClick={() => setMenuOpen(true)} />}
      <div className="flex-grow">
        <Header />
        {upcoming ? (
          <Upcoming
            artist={upcoming.artist}
            exhibition={upcoming.exhibition}
            date={formatRange(upcoming.startDate, upcoming.endDate)}
            vernissage={formatVernissage(upcoming.vernissageDate)}
            link={upcoming.link}
          />
        ) : (
          <Upcoming
            artist="Marie Hrachovcová"
            exhibition="Atlas neznámých květin"
            date="17. 6. - 31. 8. 2025"
            vernissage="Vernisáž 16. 6. 2025"
            link="https://www.instagram.com/mariehrachovcova_/"
          />
        )}
        <Gallery exhibitions={exhibitions} />
      </div>
      <Footer
        onContactClick={handleContactClick}
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
          onContactClick={handleMenuContactClick}
          onPressClick={handlePressClick}
          onCurrentExhibitionClick={handleCurrentExhibitionClick}
        />
      </Modal>
      <Modal
        isOpen={isContactRoute}
        onClose={handleContactClose}
        closeOnBackdropClick={false}
      >
        {contact && <ContactContent contact={contact} />}
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
