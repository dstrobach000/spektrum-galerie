"use client";

import React from "react";

const NameCard = ({
  curator,
  promo,
  install,
  photo,
  thanks,
  keyImage,
}: {
  curator: string;
  promo: string;
  install: string;
  photo: string;
  thanks: string;
  keyImage: string;
}) => (
  <div className="flex flex-col gap-4 w-full">
    {/* Desktop: 3 columns. Mobile: 1 column, image last. */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
      {/* Column 1 */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs font-light mb-1">kurátorka:</div>
          <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{curator}</div>
        </div>
        <div>
          <div className="text-xs font-light mb-1">promo:</div>
          <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{promo}</div>
        </div>
        <div>
          <div className="text-xs font-light mb-1">instalace:</div>
          <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{install}</div>
        </div>
      </div>
      {/* Column 2 */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs font-light mb-1">foto:</div>
          <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{photo}</div>
        </div>
        <div>
          <div className="text-xs font-light mb-1">grafika:</div>
          <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">Paul Gate</div>
        </div>
        <div>
          <div className="text-xs font-light mb-1">speciální poděkování:</div>
          <div className="border border-black rounded-xl p-4 font-light w-full">{thanks}</div>
        </div>
      </div>
      {/* Column 3 (image): mobile order-last, desktop order-none */}
      <div className="flex flex-col w-full order-last sm:order-none">
        <div className="overflow-hidden w-full">
          <img
            src={keyImage}
            alt="Exhibition key visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);

export default NameCard;
