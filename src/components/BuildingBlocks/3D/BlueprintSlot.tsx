"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import BlueprintModelComponent from "./BlueprintModel";


export default function BlueprintSlot() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="border border-black rounded-full overflow-hidden aspect-[3/1] w-full h-[150px] md:h-auto">
      {isVisible ? (
        <Canvas
        className="w-full h-full"
        style={{ background: "#fff", width: "100%", height: "100%", display: "block" }}
        dpr={[1, 1]}
        orthographic
        camera={{ position: [-200, 200, 200], zoom: 60, near: -1000, far: 1000 }}
          frameloop="always"
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          
          // Optimize WebGL context for performance
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

          // Skip heavy environment map for better performance
          // Environment maps are computationally expensive and not essential for basic 3D models
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <BlueprintModelComponent />
        </Suspense>
      </Canvas>
      ) : (
        <div className="w-full h-full bg-white" />
      )}
    </div>
  );
}
