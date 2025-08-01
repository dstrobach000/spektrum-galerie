"use client";

import React from "react";

const NameCard = ({
  curator,
  promo,
  install,
  photo,
  thanks,
}: {
  curator: string;
  promo: string;
  install: string;
  photo: string;
  thanks: string;
}) => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex flex-col gap-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 mt-6">
      {/* kurátorka */}
      <div>
        <div className="text-xs font-light mb-1">kurátorka:</div>
        <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{curator}</div>
      </div>
      {/* promo */}
      <div>
        <div className="text-xs font-light mb-1">promo:</div>
        <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{promo}</div>
      </div>
      {/* foto */}
      <div>
        <div className="text-xs font-light mb-1">foto:</div>
        <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{photo}</div>
      </div>
      {/* grafika */}
      <div>
        <div className="text-xs font-light mb-1">grafika:</div>
        <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">Paul Gate</div>
      </div>
      {/* instalace */}
      <div>
        <div className="text-xs font-light mb-1">instalace:</div>
        <div className="border border-black rounded-xl text-lg font-light px-3 py-2 w-full">{install}</div>
      </div>
      {/* speciální poděkování */}
      <div className="md:col-span-2 lg:col-span-3">
        <div className="text-xs font-light mb-1">speciální poděkování:</div>
        <div className="border border-black rounded-xl p-4 font-light w-full">{thanks}</div>
      </div>
    </div>
  </div>
);

export default NameCard;
