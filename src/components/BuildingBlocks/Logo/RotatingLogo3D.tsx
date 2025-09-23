"use client";

import React, { Suspense, useMemo, useRef, useEffect, useCallback, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import clsx from "clsx";

type Props = { src: string; className?: string };

const ORIENTATION: [number, number, number] = [Math.PI / 2, 0, 0];
const PADDING = 0.88;   // ↑ bigger = more margin (smaller logo)
const TILT_X = 0.12;
const SWING_SPEED = 6;  // seconds per full cycle
const SWING_DEG = 10;   // ± degrees of yaw

function useChrome() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xb0b0b0, // Much darker gray for strong contrast
        metalness: 0.02, // Extremely low metallic for matte look
        roughness: 0.98, // Almost perfectly rough for matte finish
        envMapIntensity: 0.02, // Minimal environment reflection
        clearcoat: 0.0, // No clearcoat
        clearcoatRoughness: 1.0, // Maximum rough clearcoat
        reflectivity: 0.02, // Extremely low reflectivity
        side: THREE.DoubleSide,
      }),
    []
  );
}

/**
 * Measure the model ONCE in a canonical pose (tilt=0, swing=0).
 * Save its base bounding size, then only recompute zoom on viewport size changes.
 * We also freeze the swing during measurement to avoid race conditions.
 */
function useFitOnce(
  holderRef: React.MutableRefObject<THREE.Object3D | null>,
  modelRef: React.MutableRefObject<THREE.Object3D | null>,
  tiltRef: React.MutableRefObject<THREE.Object3D | null>,
  swingRef: React.MutableRefObject<THREE.Object3D | null>,
  measuringRef: React.MutableRefObject<boolean>,
  padding = PADDING
) {
  const { camera, size } = useThree();
  const baseDims = useRef<THREE.Vector3 | null>(null);

  const updateZoom = useCallback(() => {
    const holder = holderRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    const base = baseDims.current;
    if (!holder || !base || !cam.isPerspectiveCamera) return;

    const z = Math.abs(cam.position.z);
    const frustumH = 2 * Math.tan((cam.fov * Math.PI) / 180 / 2) * z;
    const frustumW = frustumH * (size.width / Math.max(size.height, 1));
    const k = padding * Math.min(frustumW / Math.max(base.x, 1e-6), frustumH / Math.max(base.y, 1e-6));
    if (isFinite(k) && k > 0) holder.scale.setScalar(k);
  }, [camera, size.width, size.height, padding, holderRef]);

  // One-time measurement in a frozen pose
  useEffect(() => {
    if (baseDims.current) return; // already measured

    const holder = holderRef.current;
    const model = modelRef.current;
    const tilt = tiltRef.current;
    const swing = swingRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    if (!holder || !model || !tilt || !swing || !cam.isPerspectiveCamera) return;

    measuringRef.current = true; // freeze swing during measure

    const prevTiltX = tilt.rotation.x;
    const prevSwingY = swing.rotation.y;

    // Canonical pose for measuring
    tilt.rotation.x = 0;
    swing.rotation.y = 0;
    holder.position.set(0, 0, 0);
    holder.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(...ORIENTATION);
    model.scale.set(1, 1, 1);

    // Two RAFs ensure world matrices are settled
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        model.updateMatrixWorld(true);

        // Save base size (at scale 1)
        const sized = new THREE.Box3().setFromObject(holder);
        const base = new THREE.Vector3();
        sized.getSize(base);
        baseDims.current = base;

        // Restore swing + tilt, unfreeze, and apply initial zoom
        tilt.rotation.x = prevTiltX;
        swing.rotation.y = prevSwingY;
        measuringRef.current = false;
        updateZoom();
      });
    });

    return () => cancelAnimationFrame(id);
  }, [camera, holderRef, modelRef, tiltRef, swingRef, measuringRef, updateZoom]);

  // On viewport size change, just recompute zoom (no new measurement)
  useEffect(() => {
    updateZoom();
  }, [size.width, size.height, updateZoom]);
}

function LogoModel({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  const chrome = useChrome();

  const root = useMemo(() => {
    const s = gltf.scene.clone(true);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        
        // Ensure geometry has proper normals for smooth shading
        if (!m.geometry.attributes.normal) {
          m.geometry.computeVertexNormals();
        }
        
        // Apply smooth shading
        m.geometry.computeVertexNormals();
        
        // Apply the chrome material
        m.material = chrome.clone ? chrome.clone() : chrome;
        
        // Ensure the mesh is properly positioned and scaled
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    
    // Center the model
    const box = new THREE.Box3().setFromObject(s);
    const center = box.getCenter(new THREE.Vector3());
    s.position.sub(center);
    
    // Rotate the logo to face frontally
    s.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X axis to make it stand upright
    s.rotation.z = 0; // Ensure no Z rotation
    
    return s;
  }, [gltf, chrome]);

  const tiltRef = useRef<THREE.Group>(null);
  const holderRef = useRef<THREE.Group>(null);
  const swingRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const measuringRef = useRef(false);

  useFitOnce(holderRef, modelRef, tiltRef, swingRef, measuringRef, PADDING);

  // Swing the logo, but pause while measuring so the box is stable
  useFrame(({ clock }) => {
    if (!swingRef.current || measuringRef.current) return;
    const t = clock.getElapsedTime();
    const angle = Math.sin((t / SWING_SPEED) * Math.PI * 2) * THREE.MathUtils.degToRad(SWING_DEG);
    swingRef.current.rotation.y = angle;
  });

  return (
    <group ref={tiltRef} rotation={[TILT_X, 0, 0]}>
      <group ref={holderRef}>
        <group ref={swingRef}>
          <group ref={modelRef}>
            <primitive object={root} />
          </group>
        </group>
      </group>
    </group>
  );
}

const RotatingLogo3D: React.FC<Props> = ({ src, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load the 3D model only when it's visible
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
    <div ref={containerRef} className={clsx("w-full h-full", className)} style={{ perspective: 1000 }}>
      {isVisible ? (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: 35 }}
          frameloop="demand"
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.5;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            const pmrem = new THREE.PMREMGenerator(gl);
            const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
            scene.environment = envTex;
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <LogoModel url={src} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default RotatingLogo3D;