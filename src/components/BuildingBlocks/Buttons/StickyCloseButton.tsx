"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlowButton from "./GlowButton";

type Props = {
  label?: string;
  className?: string;
  onClick?: () => void; // optional override used by Modal
};

/**
 * Sticky close button. If no onClick is provided, it defaults to
 * navigating home using router.push("/").
 */
const StickyCloseButton = ({ label = "Zavřít", className = "", onClick }: Props) => {
  const router = useRouter();
  const [left, setLeft] = useState(16);

  useEffect(() => {
    const updateLeft = () => {
      const modalContent = document.querySelector(".modal-content");
      if (!modalContent) return setLeft(16);
      const { left: railLeft } = (modalContent as HTMLElement).getBoundingClientRect();
      setLeft(Math.max(16, Math.round(railLeft - 72)));
    };

    updateLeft();
    const raf = requestAnimationFrame(updateLeft);
    window.addEventListener("resize", updateLeft);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateLeft);
    };
  }, []);

  const handleDefault = () => {
    router.push("/", { scroll: false });
  };

  return (
    <div
      className="fixed"
      style={{
        left: `${left}px`,
        top: "4.5rem",
        zIndex: 10000,
      }}
    >
      <GlowButton
        glowColor="bg-[#a3f730]"
        onClick={onClick ?? handleDefault}
        className={`text-lg ${className}`}
        floating={true}
      >
        {label}
      </GlowButton>
    </div>
  );
};

export default StickyCloseButton;
