"use client";

import React from "react";
import GlowButton from "./GlowButton";

const MenuButton = ({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) => (
  <div className="fixed left-4 top-[7.5rem] z-50">
    <GlowButton
      onClick={onClick}
      glowColor="bg-[#a3f730]"
      className={className}
      floating={false}
    >
      Menu
    </GlowButton>
  </div>
);

export default MenuButton;
