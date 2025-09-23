"use client";

import React from "react";
import LogoSlot from "@/components/BuildingBlocks/Logo/LogoSlot";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";

const menuItems = [
  { label: "O galerii", href: "#header", action: null },
  { label: "Aktuální", href: null, action: "currentExhibition" },
  { label: "Výstavy", href: "#gallery", action: null },
  { label: "Kontakty", href: null, action: "contact" },
  { label: "Newsletter", href: "#footer", action: null },
  { label: "Ke stažení", href: null, action: "press" },
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

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      if (onClose) onClose();
    }
  };

  return (
    <div className="w-full relative">
      <div className="border border-black rounded-xl p-6 relative max-w-4xl mx-auto">
        <div className="mb-6">
          <LogoSlot />
        </div>
        <div className="flex flex-col gap-4 items-center">
          {menuItems.map((item) => {
            const actionHandler =
              item.action && typeof actionHandlers[item.action] === "function"
                ? actionHandlers[item.action]
                : undefined;
            return (
              <div
                key={item.label}
                className="inline-flex p-2 bg-white"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              >
                <GlowButton
                  className="px-6 py-2 text-black text-5xl"
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
    </div>
  );
};

export default MenuContent;
