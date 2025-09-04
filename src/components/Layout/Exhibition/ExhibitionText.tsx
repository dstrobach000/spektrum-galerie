"use client";

import React from "react";

const ExhibitionText = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "bordered";
}) => {
  return (
    <div
      className={[
        "font-light w-full p-4 bg-white text-lg [&>*:not(:last-child)]:mb-6", // <-- both are text-lg now
        variant === "bordered" ? "border border-black rounded-xl" : ""
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default ExhibitionText;
