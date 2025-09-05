"use client";

import React from "react";

/**
 * Generic text block used across Exhibition pages.
 * - `variant="bordered"` draws the rounded card.
 * - `spacing` controls paragraph gaps inside the block.
 * - `className` lets you tweak margins (mt/mb) per instance.
 */
const ExhibitionText = ({
  children,
  variant,
  spacing = "md",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "bordered";
  spacing?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const spacingClass =
    spacing === "sm"
      ? "[&>*:not(:last-child)]:mb-3"
      : spacing === "lg"
      ? "[&>*:not(:last-child)]:mb-8"
      : "[&>*:not(:last-child)]:mb-6"; // md (default)

  const base = "font-light w-full p-4 bg-white text-base";
  const bordered = variant === "bordered" ? "border border-black rounded-xl" : "";

  return (
    <div className={[base, spacingClass, bordered, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

export default ExhibitionText;
