import React from "react";
import Header from "@/components/Layout/Header";
import Gallery from "@/components/Layout/Gallery";
import Footer from "@/components/Layout/Footer";
import HomeClient from "@/components/Content/HomeClient";
import UpcomingWrapper from "@/components/Content/UpcomingWrapper";
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

export default async function Home() {
  // Server-side data fetching
  const [exhibitions, contact, upcoming] = await Promise.all([
    fetchExhibitions(),
    sanityClient.fetch<Contact | null>(contactQuery),
    sanityClient.fetch<UpcomingExhibition | null>(upcomingQuery),
  ]);

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      <div className="flex-grow">
        <Header />
        <UpcomingWrapper upcoming={upcoming} />
        <Gallery exhibitions={exhibitions} />
      </div>

      <Footer />

      <HomeClient 
        exhibitions={exhibitions}
        contact={contact}
      />
    </main>
  );
}
