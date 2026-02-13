"use client";

import React, { Suspense, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import LogoModel from "./LogoModel";

type LogoHostContextValue = {
  registerHost: (id: string, el: HTMLDivElement) => void;
  unregisterHost: (id: string) => void;
};

const LogoHostContext = createContext<LogoHostContextValue | null>(null);

type HostEntry = {
  id: string;
  el: HTMLDivElement;
};

type Frame = {
  active: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
};

function PersistentLogoCanvas() {
  return (
    <Canvas
      className="w-full h-full"
      dpr={[1, 1]}
      camera={{ position: [0, 0, 20], fov: 30 }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.5;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Suspense fallback={null}>
        <LogoModel url="/3D/spektrum_galerie.glb" />
      </Suspense>
    </Canvas>
  );
}

export function LogoSingletonProvider({ children }: { children: React.ReactNode }) {
  const [hosts, setHosts] = useState<HostEntry[]>([]);
  const [frame, setFrame] = useState<Frame>({
    active: false,
    left: -9999,
    top: -9999,
    width: 1,
    height: 1,
    zIndex: 40,
  });
  const activeHostRef = useRef<HTMLDivElement | null>(null);

  const registerHost = useCallback((id: string, el: HTMLDivElement) => {
    setHosts((prev) => [...prev.filter((h) => h.id !== id), { id, el }]);
  }, []);

  const unregisterHost = useCallback((id: string) => {
    setHosts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({ registerHost, unregisterHost }),
    [registerHost, unregisterHost]
  );

  useEffect(() => {
    activeHostRef.current = hosts.length ? hosts[hosts.length - 1].el : null;
  }, [hosts]);

  useEffect(() => {
    const updateFrame = () => {
      const host = activeHostRef.current;
      if (!host) {
        setFrame((prev) => ({ ...prev, active: false, left: -9999, top: -9999, width: 1, height: 1 }));
        return;
      }

      const rect = host.getBoundingClientRect();
      const inModal = !!host.closest(".modal-content");
      setFrame({
        active: rect.width > 0 && rect.height > 0,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        zIndex: inModal ? 9999 : 40,
      });
    };

    updateFrame();
    const raf = requestAnimationFrame(updateFrame);

    const ro = new ResizeObserver(updateFrame);
    if (activeHostRef.current) ro.observe(activeHostRef.current);

    window.addEventListener("resize", updateFrame);
    window.addEventListener("scroll", updateFrame, true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", updateFrame);
      window.removeEventListener("scroll", updateFrame, true);
    };
  }, [hosts]);

  return (
    <LogoHostContext.Provider value={contextValue}>
      {children}
      <div
        className="pointer-events-none fixed border border-black rounded-full overflow-hidden"
        style={{
          left: `${Math.round(frame.left)}px`,
          top: `${Math.round(frame.top)}px`,
          width: `${Math.max(1, Math.round(frame.width))}px`,
          height: `${Math.max(1, Math.round(frame.height))}px`,
          zIndex: frame.zIndex,
          opacity: frame.active ? 1 : 0,
        }}
      >
        <PersistentLogoCanvas />
      </div>
    </LogoHostContext.Provider>
  );
}

export function useLogoHost() {
  const ctx = useContext(LogoHostContext);
  if (!ctx) {
    throw new Error("useLogoHost must be used within LogoSingletonProvider");
  }
  return ctx;
}
