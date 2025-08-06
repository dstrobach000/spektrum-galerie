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
  speed = 6,
  className = "",
}) => {
  return (
    <div
      className={clsx("flex justify-center items-center w-full h-full", className)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="animate-pendulum w-full h-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          ["--speed" as string]: `${speed}s`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain w-full h-full"
          priority
        />
      </div>
    </div>
  );
};

export default RotatingLogo;
