"use client";

import React from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import LogoSlot from "@/components/BuildingBlocks/Logo/LogoSlot";
import type { Contact } from "@/types/Contact";

const ContactContent = ({ contact }: { contact: Contact }) => (
  <div className="w-full relative">
    <div className="border border-black rounded-xl p-6 relative max-w-4xl mx-auto">
      <div className="flex flex-col space-y-6">
        <LogoSlot />
        <div className="relative flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="border border-black rounded-xl p-6 flex-1">
              {contact.address.map((line, idx) => (
                <p className="font-light text-base md:text-lg" key={idx}>{line}</p>
              ))}
              {contact.mapLink && (
                <div className="flex justify-center">
                  <GlowButton
                    className="w-auto py-2 text-sm font-light text-black"
                    glowColor="bg-[#a3f730]"
                    floating={false}
                    onClick={() => window.open(contact.mapLink, "_blank")}
                  >
                    Otevřít v Mapách
                  </GlowButton>
                </div>
              )}
            </div>
            <div className="border border-black rounded-xl p-6 flex-1">
              {contact.invoiceDetails.map((line, idx) => (
                <p className="font-light text-base md:text-lg" key={idx}>{line}</p>
              ))}
            </div>
          </div>
          {contact.openingHours && (
            <p className="text-center text-base md:text-lg font-light">
              {contact.openingHours}
            </p>
          )}
          <div className="flex justify-center gap-6">
            {contact.facebook && (
              <GlowButton
                className="px-6 py-2 text-sm font-light text-black"
                glowColor="bg-[#a3f730]"
                floating={false}
                onClick={() => window.open(contact.facebook, "_blank")}
              >
                Facebook
              </GlowButton>
            )}
            {contact.instagram && (
              <GlowButton
                className="px-6 py-2 text-sm font-light text-black"
                glowColor="bg-[#a3f730]"
                floating={false}
                onClick={() => window.open(contact.instagram, "_blank")}
              >
                Instagram
              </GlowButton>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {contact.roles?.map((person, idx) => (
              <div className="border border-black rounded-xl p-6 flex-1" key={idx}>
                <p className="font-light text-base md:text-lg">{person.name}</p>
                <p className="font-light text-base md:text-lg">{person.role}</p>
                <div className="flex justify-center">
                  <GlowButton
                    className="w-auto py-2 text-sm font-light text-black"
                    glowColor="bg-[#a3f730]"
                    floating={false}
                    onClick={() => (window.location.href = `mailto:${person.email}`)}
                  >
                    {person.email}
                  </GlowButton>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
);

export default ContactContent;
