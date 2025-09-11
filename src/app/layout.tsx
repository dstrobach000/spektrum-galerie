import "./globals.css";
import type { ReactNode } from "react";
import CookieBanner from "@/components/Legal/CookieBanner";

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
        {children}
        {modal}
        <CookieBanner />
      </body>
    </html>
  );
}
