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
