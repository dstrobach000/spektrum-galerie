"use client";

import dynamic from "next/dynamic";

const slotFallback = () => (
  <div className="border border-black rounded-full overflow-hidden aspect-[3/1] w-full h-[150px] md:h-auto bg-white" />
);

const LogoSlot = dynamic(() => import("@/components/BuildingBlocks/Logo/LogoSlot"), {
  ssr: false,
  loading: slotFallback,
});

const BlueprintSlot = dynamic(() => import("@/components/BuildingBlocks/3D/BlueprintSlot"), {
  ssr: false,
  loading: slotFallback,
});

export default function BrandMediaRow({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-start ${className}`}>
      <LogoSlot />
      <BlueprintSlot />
    </div>
  );
}
