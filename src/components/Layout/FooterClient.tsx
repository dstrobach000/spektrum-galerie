"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

export default function FooterClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | { type: "ok" | "err"; text: string }>(null);
  const router = useRouter();

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {/* Kontakty */}
      <div className="border border-black rounded-xl p-4 flex flex-col items-center justify-center h-full">
        <GlowButton
          onClick={handleContactClick}
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
          <a href="/privacy" className="underline">Zásady ochrany osobních údajů</a>
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
          onClick={handlePressClick}
          className="px-4 py-2 text-lg self-center"
          glowColor="bg-[#a3f730]"
          floating={false}
        >
          Ke stažení
        </GlowButton>
      </div>
    </div>
  );
}
