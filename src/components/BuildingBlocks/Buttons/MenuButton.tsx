"use client";

import React, { useEffect, useState } from "react";
import GlowButton from "./GlowButton";

const FLOAT_OFFSET = 96;
const DEFAULT_TOP = 72;

const MenuButton = ({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) => {
  const [left, setLeft] = useState(16);
  const [top, setTop] = useState(DEFAULT_TOP);

  useEffect(() => {
    const updatePosition = () => {
      const shell = document.getElementById("main-shell");
      const fallbackHeader = document.getElementById("header");
      const rail = shell ?? fallbackHeader;
      if (!rail) return setLeft(16);
      const { left: railLeft } = rail.getBoundingClientRect();
      setLeft(Math.max(16, Math.round(railLeft - FLOAT_OFFSET)));

      const topControls = document.getElementById("header-top-controls");
      if (topControls) {
        const controlsBottom = topControls.getBoundingClientRect().bottom;
        setTop(Math.max(DEFAULT_TOP, Math.round(controlsBottom + 8)));
      } else {
        setTop(DEFAULT_TOP);
      }
    };

    updatePosition();
    const raf = requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div
      className="fixed z-50"
      style={{
        left: `${left}px`,
        top: `${top}px`,
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
