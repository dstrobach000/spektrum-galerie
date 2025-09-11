"use client";

import React, { CSSProperties } from "react";

/**
 * Generic text block used across Exhibition pages.
 * - `variant="bordered"` draws the rounded card.
 * - `spacing` controls vertical gaps between sibling blocks via space-y-* (no extra at the end).
 * - `tightBottom` removes ONLY the container's bottom padding (inline style), keeping top/sides.
 */
type Props = {
  children: React.ReactNode;
  variant?: "bordered";
  spacing?: "sm" | "md" | "lg";
  className?: string;
  tightBottom?: boolean;
};

const ExhibitionText = ({
  children,
  variant,
  spacing = "md",
  className = "",
  tightBottom = false,
}: Props) => {
  const base = "font-light w-full p-4 bg-white text-base";
  const bordered = variant === "bordered" ? "border border-black rounded-xl" : "";

  // Spacing between inner blocks (no trailing space after the last one)
  const spaceY =
    spacing === "sm" ? "space-y-3" : spacing === "lg" ? "space-y-8" : "space-y-6"; // md default

  // Inline style wins over utilities—zero ONLY bottom padding when requested
  const inlineStyle: CSSProperties | undefined = tightBottom ? { paddingBottom: 0 } : undefined;

  return (
    <div className={[base, bordered, className].filter(Boolean).join(" ")} style={inlineStyle}>
      <div className={spaceY}>{children}</div>
    </div>
  );
};

export default ExhibitionText;
