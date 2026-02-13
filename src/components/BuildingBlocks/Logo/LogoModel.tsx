"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const TILT_X = 0.12;
const SWING_SPEED = 8;  // seconds per full cycle (slowed down by 1/3)
const SWING_DEG = 10;   // ± degrees of yaw

function useChrome() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xe0e0e0, // Light gray for proper appearance
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

export default function LogoModel({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  const chrome = useChrome();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const root = useMemo(() => {
    const s = gltf.scene.clone(true);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        
        // Skip expensive normal computation for better performance
        // Most GLTF models already have proper normals
        
        // Apply the chrome material
        m.material = chrome.clone ? chrome.clone() : chrome;
        
        // Disable shadows for better performance
        m.castShadow = false;
        m.receiveShadow = false;
      }
    });
    
    // Center the model
    const box = new THREE.Box3().setFromObject(s);
    const center = box.getCenter(new THREE.Vector3());
    s.position.sub(center);
    
    // Scale the model - smaller on mobile, original size on desktop
    const scale = isMobile ? 0.5 : 0.7;
    s.scale.setScalar(scale);
    
    // Rotate the logo to face frontally (remove the -Math.PI / 2 rotation)
    s.rotation.x = 0; // Keep it flat/frontal
    s.rotation.y = 0; // No Y rotation
    s.rotation.z = 0; // No Z rotation
    
    return s;
  }, [gltf, chrome, isMobile]);

  const tiltRef = useRef<THREE.Group>(null);
  const holderRef = useRef<THREE.Group>(null);
  const swingRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Swing the logo with optimized performance
  useFrame(({ clock }) => {
    if (!swingRef.current) return;
    
    // Reduce frame rate to 30fps for smooth performance
    const t = clock.getElapsedTime();
    if (Math.floor(t * 30) % 2 !== 0) return; // Skip every other frame to get ~30fps
    
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

useGLTF.preload("/3D/spektrum_galerie.glb");
