import React from "react";

interface GlowButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "bg-[#a3f730]" or "bg-orange-400"
  type?: "button" | "submit" | "reset";
  link?: string;
  floating?: boolean;
}

const GlowButton = ({
  onClick,
  children,
  className = "",
  glowColor = "bg-[#a3f730]",
  type = "button",
  link,
  floating = true,
}: GlowButtonProps) => {
  const animationClass = floating ? "animate-float-pulse" : "";
  const commonProps = {
    className: `relative inline-block rounded-full px-6 py-2 text-lg font-light text-black transition-transform duration-300 ${animationClass} ${className}`,
    tabIndex: 0,
  };

  const inner = (
    <>
      <span className={`absolute -inset-2 rounded-full blur-md pointer-events-none ${glowColor}`}></span>
      <span className="relative z-10">{children}</span>
    </>
  );

  // If onClick is provided, always render a <button>
  if (onClick) {
    return (
      <button type={type} onClick={onClick} {...commonProps}>
        {inner}
      </button>
    );
  }

  // If link is provided, render an <a> tag with NO target if it's an anchor link
  if (link) {
    const isAnchor = link.startsWith("#");
    return (
      <a
        href={link}
        {...commonProps}
        {...(!isAnchor && { target: "_blank", rel: "noopener noreferrer" })}
        style={{ textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }

  // Fallback
  return (
    <button type={type} {...commonProps}>
      {inner}
    </button>
  );
};

export default GlowButton;
