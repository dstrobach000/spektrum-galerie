import PrivacyModalClient from "@/components/Content/PrivacyModalClient";
import type { Metadata } from "next";

export default function PrivacyPage() {
  return <PrivacyModalClient />;
}

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
};
