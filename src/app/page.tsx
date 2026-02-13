import React from "react";
import Header from "@/components/Layout/Header";
import Gallery from "@/components/Layout/Gallery";
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
  landscapeImages?: SanityImage[];
  portraitImages?: SanityImage[];
  poster?: SanityImage; // Exhibition graphic/poster
  description?: string;
};

type UpcomingExhibition = {
  artist: string;
  exhibition: string;
  startDate: string;
  endDate: string;
  vernissageDate: string;
  link?: string;
  isVisible?: boolean;
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

type SiteSettings = {
  showCurrentLabel?: boolean;
};

const fetchExhibitions = async (): Promise<Exhibition[]> => {
  return await sanityClient.fetch(`
    *[_type == "exhibition"] | order(startDate desc) {
      _id,
      title,
      artist,
      "slug": slug.current,
      isOneDayEvent,
      startDate,
      endDate,
      vernissageDate,
      landscapeImages[]{ asset->{ url } },
      portraitImages[]{ asset->{ url } },
      poster{ asset->{ url } },
             landscapeVideos[]{asset->{url}},
             portraitVideos[]{asset->{url}},
      description
    }
  `);
};

const contactQuery = `
  *[_type == "contact"] | order(_updatedAt desc)[0]{
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
    link,
    isVisible
  }
`;

const siteSettingsQuery = `
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]{
    showCurrentLabel
  }
`;


// Enable ISR (Incremental Static Regeneration) with 60-second revalidation
export const revalidate = 60;

// Force dynamic rendering for immediate updates
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Server-side data fetching
  const [exhibitions, contact, upcoming, siteSettings] = await Promise.all([
    fetchExhibitions(),
    sanityClient.fetch<Contact | null>(contactQuery),
    sanityClient.fetch<UpcomingExhibition | null>(upcomingQuery),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  return (
    <main className="bg-white text-black font-sans flex flex-col min-h-screen relative">
      <div id="main-shell" className="w-full">
        <div className="flex-grow">
          <Header />
          <UpcomingWrapper upcoming={upcoming} />
          <Gallery
            exhibitions={exhibitions}
            showCurrentLabel={siteSettings?.showCurrentLabel ?? true}
          />
        </div>
      </div>

      <HomeClient 
        contact={contact}
      />
    </main>
  );
}
