"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";

type RotatingLogoProps = {
  src: string;
  alt?: string;
  width?: number;
  degrees?: number; // still unused
  speed?: number;
  className?: string;
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
      <div
        className="animate-pendulum"
        style={{
          transformStyle: "preserve-3d",
          ["--speed" as string]: `${speed}s`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={width} // assuming square logo, adjust if not
          priority
        />
      </div>
    </div>
  );
};

export default RotatingLogo;
