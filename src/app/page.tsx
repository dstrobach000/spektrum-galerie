"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Layout/Header";
import Gallery from "@/components/Layout/Gallery";
import Footer from "@/components/Layout/Footer";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import MenuContent from "@/components/Content/MenuContent";
import ContactContent from "@/components/Content/ContactContent";
import Upcoming from "@/components/BuildingBlocks/Labels/Upcoming";
import MenuButton from "@/components/BuildingBlocks/Buttons/MenuButton";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { sanityClient } from "@/sanity/client";

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

type UpcomingExhibition = {
  artist: string;
  exhibition: string;
  startDate: string;
  endDate: string;
  vernissageDate: string;
  link?: string;
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

// --- DATE HELPERS ---
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
    return `${startDate.getDate()}. – ${endDate.getDate()}. ${
      endDate.getMonth() + 1
    }. ${shortYear(endDate)}`;
  } else {
    return `${startDate.getDate()}. ${startDate.getMonth() + 1}. ${shortYear(
      startDate
    )} – ${endDate.getDate()}. ${endDate.getMonth() + 1}. ${shortYear(
      endDate
    )}`;
  }
}
function formatVernissage(vernissage?: string) {
  if (!vernissage) return "";
  const date = new Date(vernissage);
  return `Vernisáž: ${date.getDate()}. ${date.getMonth() + 1}. ${shortYear(
    date
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
// ---

export default function Home() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  useEffect(() => {
    fetchExhibitions().then(setExhibitions);
  }, []);

  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => {
    sanityClient.fetch(contactQuery).then(setContact);
  }, []);

  const [upcoming, setUpcoming] = useState<UpcomingExhibition | null>(null);
  useEffect(() => {
    sanityClient.fetch(upcomingQuery).then(setUpcoming);
  }, []);

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

  // --- OPENERS (from main page) ---
  const handleContactClick = () => {
    setReturnToMenu("none"); // opened from main/footer, do not reopen menu
    router.push("/kontakt", { scroll: false });
  };

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
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      {!menuOpen && <MenuButton onClick={() => setMenuOpen(true)} />}

      <div className="flex-grow">
        <Header />
        {upcoming && (
          <Upcoming
            artist={upcoming.artist}
            exhibition={upcoming.exhibition}
            date={formatRange(upcoming.startDate, upcoming.endDate)}
            vernissage={formatVernissage(upcoming.vernissageDate)}
            link={upcoming.link}
          />
        )}
        <Gallery exhibitions={exhibitions} />
      </div>

      <Footer
        onContactClick={handleContactClick}
        onPressClick={() => router.push("/press")} // Footer should NOT reopen menu later
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
    </main>
  );
}
