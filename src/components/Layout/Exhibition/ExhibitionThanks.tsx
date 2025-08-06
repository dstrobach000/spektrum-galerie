"use client";

import React from "react";

const ExhibitionThanks = ({ thanks }: { thanks: string }) => {
  // Split by comma or semicolon, trim spaces
  const thanksList = thanks
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full mt-4 flex flex-wrap gap-x-3 gap-y-1 items-start">
      {thanksList.length > 0 && (
        <span className="text-xs font-light mb-0.5 min-w-[130px]">
          speciální poděkování:
        </span>
      )}
      {thanksList.map((name, i) => (
        <span
          key={name + i}
          className="border border-black rounded-xl text-xs font-light px-3 py-2"
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default ExhibitionThanks;
