import React from "react";

interface GlowButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
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
    className: `relative inline-block rounded-full px-6 py-2 text-lg font-light text-black isolate ${animationClass} ${className}`,
    tabIndex: 0,
  };

  const inner = (
    <>
      <span
        className={`absolute inset-0 -m-2 rounded-full blur-md pointer-events-none ${glowColor}`}
        style={{
          willChange: "transform, filter",
          transform: "translateZ(0)", // forces GPU layer
        }}
      ></span>
      <span className="relative z-10">{children}</span>
    </>
  );

  if (onClick) {
    return (
      <button type={type} onClick={onClick} {...commonProps}>
        {inner}
      </button>
    );
  }

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

  return (
    <button type={type} {...commonProps}>
      {inner}
    </button>
  );
};

export default GlowButton;
