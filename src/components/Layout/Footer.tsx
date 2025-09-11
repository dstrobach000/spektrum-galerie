"use client";

import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

type FooterProps = {
  onContactClick?: () => void;
  onPressClick?: () => void;
};

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ onContactClick, onPressClick }, ref) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<null | { type: "ok" | "err"; text: string }>(null);

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

    return (
      <footer
        ref={ref}
        className="border-t border-black bg-white px-6 sm:px-10 py-10 sm:py-6"
        id="footer"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Kontakty */}
            <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
              <GlowButton
                onClick={onContactClick}
                className="px-4 py-2 text-lg self-center"
                glowColor="bg-[#a3f730]"
                floating={false}
              >
                Kontakty
              </GlowButton>
            </div>

            {/* Newsletter (email only) */}
            <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
              <form
                onSubmit={handleSubmit}
                className="space-y-3 w-full max-w-sm flex flex-col items-center"
              >
                <input
                  type="email"
                  placeholder="Zadejte svůj e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 border border-black rounded-full w-full focus:outline-none font-light text-center"
                />

                <GlowButton
                  className="px-4 py-2 text-lg self-center"
                  type="submit"
                  glowColor="bg-[#a3f730]"
                  floating={false}
                >
                  {loading ? "Odesílám…" : "Odebírat newsletter"}
                </GlowButton>

                {/* GDPR note */}
                <p className="text-xs font-light text-black">
                  Přihlášením souhlasíte se zpracováním e-mailu pro zasílání novinek.
                  Více v{" "}
                  <a href="/privacy" className="underline">
                    Zásadách ochrany osobních údajů
                  </a>
                  .
                </p>

                {/* Feedback message — same size as GDPR note, subtle color */}
                {message && (
                  <p className="text-xs font-light text-black">
                    {message.text}
                  </p>
                )}
              </form>
            </div>

            {/* Ke stažení */}
            <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
              <GlowButton
                onClick={onPressClick}
                className="px-4 py-2 text-lg self-center"
                glowColor="bg-[#a3f730]"
                floating={false}
              >
                Ke stažení
              </GlowButton>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center w-full">
            <p className="text-sm font-light text-black text-center leading-snug mb-3">
              Děkujeme statutárnímu městu Brnu a Ministerstvu kultury České republiky za finanční
              podporu tohoto projektu.
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Image
                src="/logos/ministerstvo_kultury.png"
                alt="Ministerstvo kultury"
                height={32}
                width={100}
                className="h-8 object-contain"
              />
              <Image
                src="/logos/brno.png"
                alt="Brno"
                height={32}
                width={100}
                className="h-12 object-contain"
              />
            </div>
            <p className="text-xs text-black font-light text-center mt-3">
              © Spektrum galerie 2025
            </p>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
