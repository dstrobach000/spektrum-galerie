"use client";

import React from "react";
import RotatingLogo from "@/components/BuildingBlocks/Logo/RotatingLogo";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

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
}) => {
  const actionHandlers: { [key: string]: (() => void) | undefined } = {
    currentExhibition: onCurrentExhibitionClick,
    contact: onContactClick,
    press: onPressClick,
  };

  // Helper for anchor scroll and close
  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      if (onClose) onClose();
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-6">
      {/* Logo */}
      <div className="border border-black rounded-full w-full leading-none p-4 flex items-center justify-center mb-8 aspect-[3/1]">
        <RotatingLogo
          src="/logos/spektrum_galerie.svg"
          speed={10}
          className="block w-full h-full"
        />
      </div>

      {/* Buttons as tags */}
      <div className="flex flex-wrap gap-4">
        {menuItems.map((item) => {
          const actionHandler =
            item.action && typeof actionHandlers[item.action] === "function"
              ? actionHandlers[item.action]
              : undefined;
          return (
            <div
              key={item.label}
              className="inline-flex p-2 bg-white"
            >
              <GlowButton
                className="px-6 py-2 text-base text-black"
                glowColor="bg-[#a3f730]"
                floating={false}
                onClick={
                  item.href
                    ? () => handleAnchorClick(item.href!)
                    : actionHandler
                }
              >
                {item.label}
              </GlowButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuContent;
