"use client";

import React from "react";

type NameCardEntry = {
  role: string;
  name: string;
};

type ExhibitionNameCardProps = {
  namecard: NameCardEntry[];
};

const ExhibitionNameCard: React.FC<ExhibitionNameCardProps> = ({
  namecard,
}) => {


  // For "speciální poděkování", split on , ; (or just treat as normal if not present)
  const thanksEntry = namecard.find(
    (entry) =>
      entry.role.toLowerCase().includes("poděkování") ||
      entry.role.toLowerCase().includes("dík") ||
      entry.role.toLowerCase().includes("thanks")
  );
  const thanksList = thanksEntry
    ? thanksEntry.name
        .split(/[;,]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Preferred order (unchanged)
  const preferredOrder = [
    "kurátorka",
    "promo",
    "foto",
    "instalace",
    "grafika",
    "speciální poděkování",
  ];

  // Sort fields (unchanged)
  const sortedFields = [
    ...preferredOrder.map((label) => {
      if (label === "speciální poděkování" && thanksList.length) {
        return { label, value: thanksList.join(", ") };
      }
      const entry = namecard.find(
        (e) => e.role.trim().toLowerCase() === label
      );
      if (entry) return { label, value: entry.name };
      return null;
    }),
    ...namecard
      .filter(
        (e) =>
          !preferredOrder.includes(e.role.trim().toLowerCase()) &&
          !(
            e.role.toLowerCase().includes("poděkování") ||
            e.role.toLowerCase().includes("dík") ||
            e.role.toLowerCase().includes("thanks")
          )
      )
      .map((e) => ({ label: e.role, value: e.name })),
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="w-full">
      {/* Text Info */}
      <div className="w-full grid grid-cols-2 border border-black rounded-xl">
          {sortedFields.map((field, i) => {
            const isTopRow = i < 2;
            const isLeftCol = i % 2 === 0;
            
            return (
              <div
                key={i}
                className={`flex flex-col p-3 font-light ${
                  !isTopRow ? "border-t border-black" : ""
                } ${!isLeftCol ? "border-l border-black" : ""}`}
              >
                <span className="text-xs mb-1">{field.label}:</span>
                <span className="text-sm leading-snug">{field.value}</span>
              </div>
            );
          })}
          
          {/* Fill empty cells to complete the cross if odd number */}
          {sortedFields.length % 2 === 1 && (
            <div className="flex flex-col p-3 font-light border-t border-black border-l border-black">
              <div></div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ExhibitionNameCard;
