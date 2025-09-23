"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const TILT_X = 0.12;
const SWING_SPEED = 8;  // seconds per full cycle (slowed down by 1/3)
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

export default function LogoModel({ url }: { url: string }) {
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
    
    // Scale the model to fill the frame
    s.scale.setScalar(0.7); // Make it fill the frame nicely
    
    // Rotate the logo to face frontally (remove the -Math.PI / 2 rotation)
    s.rotation.x = 0; // Keep it flat/frontal
    s.rotation.y = 0; // No Y rotation
    s.rotation.z = 0; // No Z rotation
    
    return s;
  }, [gltf, chrome]);

  const tiltRef = useRef<THREE.Group>(null);
  const holderRef = useRef<THREE.Group>(null);
  const swingRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Swing the logo
  // Optimize by reducing frame rate and only animating when visible
  useFrame(({ clock }) => {
    if (!swingRef.current) return;
    
    // Reduce frame rate to 30fps instead of 60fps for better performance
    const t = clock.getElapsedTime();
    if (Math.floor(t * 30) % 2 === 0) return; // Skip every other frame
    
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
