"use client";

import React from "react";
import GlowButton from "./GlowButton";
import RotatingLogo from "@/components/Logo/RotatingLogo";

const menuItems = [
  { label: "O galerii", href: "#header", action: null },
  { label: "Aktuální", href: null, action: "currentExhibition" },
  { label: "Uplynulé", href: "#gallery", action: null },
  { label: "Kontakty", href: null, action: "contact" },
  { label: "Newsletter", href: "#footer", action: null },
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
  onCurrentExhibitionClick?: () => void;
}) => (
  <div className="max-w-4xl mx-auto">
    <div className="border border-black rounded-xl p-6 relative">
      {/* LOGO - now sits directly in the card, just like in Header */}
      <div className="border border-black rounded-xl w-full leading-none p-4 flex items-center justify-center">
        <RotatingLogo
          src="/logos/spektrum_galerie.svg"
          speed={10}
          className="block w-full h-auto"
        />
      </div>
      {/* The rest of the content gets space-y-4 for stacking */}
      <div className="mt-2 sm:mt-0 relative space-y-4">
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
                  onCurrentExhibitionClick();
                  if (onClose) onClose();
                } else if (item.href) {
                  const id = item.href.replace('#', '');
                  const target = document.getElementById(id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
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
