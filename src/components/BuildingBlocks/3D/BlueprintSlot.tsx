"use client";

import { useEffect, useRef } from "react";
import { useBlueprintHost } from "./BlueprintSingletonProvider";

let hostCounter = 0;

export default function BlueprintSlot() {
  const ref = useRef<HTMLDivElement>(null);
  const hostIdRef = useRef<string>(`blueprint-host-${hostCounter++}`);
  const { registerHost, unregisterHost } = useBlueprintHost();

  useEffect(() => {
    if (ref.current) registerHost(hostIdRef.current, ref.current);
    return () => unregisterHost(hostIdRef.current);
  }, [registerHost, unregisterHost]);

  return (
    <div
      ref={ref}
      className="relative rounded-full overflow-hidden aspect-[3/1] w-full h-[150px] md:h-auto"
    >
      <div className="w-full h-full bg-white" />
    </div>
  );
}
