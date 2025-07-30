// MenuContent.tsx
"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const menuItems = [
  { label: "O galerii", href: "#o-galerii", action: null },
  { label: "Program", href: "#program", action: null },
  { label: "Aktuální", href: null, action: "currentExhibition" }, // <- CHANGED
  { label: "Uplynulé", href: "#uplynule", action: null },
  { label: "Kontakty", href: null, action: "contact" },
  { label: "Ke Stažení", href: null, action: "press" },
];

const MenuContent = ({
  onClose,
  onContactClick,
  onPressClick,
  onCurrentExhibitionClick,
}: {
  onClose?: () => void;
  onContactClick?: () => void;
  onPressClick?: () => void;
  onCurrentExhibitionClick?: () => void; // <- ADDED
}) => (
  <div className="max-w-4xl mx-auto">
    <div className="border border-black rounded-xl p-6 relative">
      <div className="mt-2 sm:mt-0 relative space-y-4">
        <div className="border border-black rounded-xl w-full leading-none">
          <RotatingLogo
            src="/logos/spektrum_galerie.svg"
            speed={10}
            className="block w-full h-auto"
          />
        </div>
        {menuItems.map((item) => (
          <div key={item.label} className="border border-black rounded-xl">
            <GlowButton
              className="w-full py-4 text-xl uppercase text-black"
              glowColor="bg-[#a3f730]"
              onClick={() => {
                if (item.action === "contact" && onContactClick) {
                  onContactClick();
                  if (onClose) onClose();
                } else if (item.action === "press" && onPressClick) {
                  onPressClick();
                  if (onClose) onClose();
                } else if (item.action === "currentExhibition" && onCurrentExhibitionClick) {
                  onCurrentExhibitionClick(); // <- ADDED
                  if (onClose) onClose();
                } else if (item.href) {
                  window.location.href = item.href;
                  if (onClose) onClose();
                }
              }}
            >
              {item.label}
            </GlowButton>
          </div>
        ))}
      </div>
    </div>
    <div className="h-8"></div>
  </div>
);

export default MenuContent;
