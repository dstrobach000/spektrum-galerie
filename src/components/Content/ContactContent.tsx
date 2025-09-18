"use client";

import React from "react";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";
import type { Contact } from "@/types/Contact";

const ContactContent = ({ contact }: { contact: Contact }) => (
  <div className="w-full">
    <div className="border border-black rounded-xl p-6 relative">
      <div className="flex flex-col space-y-6">
        <div className="border border-black rounded-full w-full leading-none min-h-[150px] md:min-h-0 flex items-center justify-center aspect-[3/1]">
          <RotatingLogo3D
            src="/3D/spektrum_galerie_bevel.obj"
            className="block w-full h-auto"
          />
        </div>
        <div className="relative flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="border border-black rounded-xl p-6 flex-1">
              {contact.address.map((line, idx) => (
                <p className="font-light" key={idx}>{line}</p>
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
                <p className="font-light" key={idx}>{line}</p>
              ))}
            </div>
          </div>
          {contact.openingHours && (
            <p className="text-center text-lg font-light">
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
                <p className="font-light">{person.name}</p>
                <p className="font-light">{person.role}</p>
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
    <div className="h-6"></div>
  </div>
);

export default ContactContent;
