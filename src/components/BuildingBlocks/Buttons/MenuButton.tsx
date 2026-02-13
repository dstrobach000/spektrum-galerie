"use client";

import React, { useEffect, useState } from "react";
import GlowButton from "./GlowButton";

const FLOAT_OFFSET = 96;

const MenuButton = ({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) => {
  const [left, setLeft] = useState(16);

  useEffect(() => {
    const updateLeft = () => {
      const shell = document.getElementById("main-shell");
      const fallbackHeader = document.getElementById("header");
      const rail = shell ?? fallbackHeader;
      if (!rail) return setLeft(16);
      const { left: railLeft } = rail.getBoundingClientRect();
      setLeft(Math.max(16, Math.round(railLeft - FLOAT_OFFSET)));
    };

    updateLeft();
    const raf = requestAnimationFrame(updateLeft);
    window.addEventListener("resize", updateLeft);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateLeft);
    };
  }, []);

  return (
    <div
      className="fixed z-50"
      style={{
        left: `${left}px`,
        top: "4.5rem",
      }}
    >
      <GlowButton
        onClick={onClick}
        glowColor="bg-[#a3f730]"
        className={`text-lg ${className}`}
        floating={true}
      >
        Menu
      </GlowButton>
    </div>
  );
};

export default MenuButton;
