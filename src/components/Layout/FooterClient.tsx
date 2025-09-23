"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

export default function FooterClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | { type: "ok" | "err"; text: string }>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-dismiss feedback after 10s
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 10_000);
    return () => clearTimeout(t);
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOK) {
      setMessage({ type: "err", text: "Zadejte platný e-mail." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // email only
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        setMessage({
          type: "err",
          text: data?.error || "Odeslání se nezdařilo. Zkuste to prosím znovu.",
        });
      } else {
        setMessage({
          type: "ok",
          text: "Vaše adresa byla přihlášena k odběru novinek.",
        });
        setEmail("");
      }
    } catch {
      setMessage({ type: "err", text: "Došlo k chybě. Zkuste to prosím znovu." });
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    router.push("/kontakt", { scroll: false });
  };

  const handlePressClick = () => {
    router.push("/press", { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 text-center w-full">
      {/* Kontakty */}
      <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center flex-1">
        <GlowButton
          onClick={handleContactClick}
          className="px-4 py-2 text-base md:text-lg self-center"
          glowColor="bg-[#a3f730]"
          floating={false}
        >
          Kontakty
        </GlowButton>
      </div>

      {/* Newsletter (email only) */}
      <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center flex-1">
        {mounted ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 w-full flex flex-col items-center"
          >
            <input
              type="email"
              placeholder="Zadejte svůj e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-black rounded-full w-full focus:outline-none font-light text-center"
              autoComplete="email"
              name="newsletter-email"
            />

            <GlowButton
              className="px-4 py-2 text-base md:text-lg self-center"
              type="submit"
              glowColor="bg-[#a3f730]"
              floating={false}
            >
              {loading ? "Odesílám…" : "Odebírat newsletter"}
            </GlowButton>

            {/* GDPR note */}
            <p className="text-xs font-light text-black">
            <a href="/privacy" className="underline">Zásady ochrany osobních údajů</a>
            </p>

            {/* Feedback message — same size as GDPR note, subtle color */}
            {message && (
              <p className="text-xs font-light text-black">
                {message.text}
              </p>
            )}
          </form>
        ) : (
          <div className="space-y-3 w-full flex flex-col items-center">
            <div className="px-4 py-2 border border-black rounded-full w-full h-10 bg-gray-100 animate-pulse"></div>
            <div className="px-4 py-2 text-base md:text-lg self-center bg-gray-100 animate-pulse rounded-full h-10 w-48"></div>
            <p className="text-xs font-light text-black">
              <a href="/privacy" className="underline">Zásady ochrany osobních údajů</a>
            </p>
          </div>
        )}
      </div>

      {/* Ke stažení */}
      <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center flex-1">
        <GlowButton
          onClick={handlePressClick}
          className="px-4 py-2 text-base md:text-lg self-center"
          glowColor="bg-[#a3f730]"
          floating={false}
        >
          Ke stažení
        </GlowButton>
      </div>
    </div>
  );
}