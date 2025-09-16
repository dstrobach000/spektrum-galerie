import "./globals.css";
import type { ReactNode } from "react";
import CookieBanner from "@/components/Legal/CookieBanner";
import TitleSetter from "@/components/TitleSetter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://spektrumgalerie.cz"),
  title: {
    default: "Spektrum galerie",
    template: "%s | Spektrum galerie",
  },
  description:
    "Spektrum galerie — contemporary art space. Exhibitions, events, press, and contacts.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    siteName: "Spektrum galerie",
    type: "website",
    locale: "cs_CZ",
    title: "Spektrum galerie",
    description:
      "Spektrum galerie — contemporary art space. Exhibitions, events, press, and contacts.",
    url: "https://spektrumgalerie.cz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spektrum galerie",
    description:
      "Spektrum galerie — contemporary art space. Exhibitions, events, press, and contacts.",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TitleSetter />
        {children}
        {modal}
        <CookieBanner />
      </body>
    </html>
  );
}
