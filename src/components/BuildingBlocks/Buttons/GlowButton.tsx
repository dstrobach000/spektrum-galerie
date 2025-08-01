// GlowButton.tsx
import React from "react";

interface GlowButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "bg-[#a3f730]" or "bg-orange-400"
  type?: "button" | "submit" | "reset";
  link?: string; // Add this line
}

const GlowButton = ({
  onClick,
  children,
  className = "",
  glowColor = "bg-[#a3f730]",
  type = "button",
  link,
}: GlowButtonProps) => {
  const commonProps = {
    className: `relative inline-block rounded-full px-6 py-2 text-lg font-light text-black transition-transform duration-300 hover:scale-105 animate-float-pulse ${className}`,
    tabIndex: 0,
    style: { width: "100%" }
  };

  const inner = (
    <>
      <span className={`absolute -inset-2 rounded-full blur-md pointer-events-none ${glowColor}`}></span>
      <span className="relative z-10">{children}</span>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
        style={{ ...commonProps.style, textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} {...commonProps}>
      {inner}
    </button>
  );
};

export default GlowButton;
