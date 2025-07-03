"use client";

import React from "react";
import clsx from "clsx";

type RotatingLogoProps = {
  src: string;
  alt?: string;
  width?: number;
  degrees?: number; // still unused
  speed?: number;
  className?: string; // ✅ NEW
};

const RotatingLogo: React.FC<RotatingLogoProps> = ({
  src,
  alt = "Rotating Logo",
  width = 600,
  speed = 6,
  className = "",
}) => {
  return (
    <div
      className={clsx("flex justify-center items-center", className)}
      style={{ perspective: "1000px" }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        className="animate-pendulum"
        style={{
          transformStyle: "preserve-3d",
          ["--speed" as any]: `${speed}s`,
        }}
      />
    </div>
  );
};

export default RotatingLogo;
