"use client";

import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PADDING = 2.1; // space around the model
const ROT_SPEED = 0.002211125;

function useChrome() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.02,
        envMapIntensity: 3.0,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        reflectivity: 1,
        side: THREE.DoubleSide,
      }),
    []
  );
}

function BlueprintModel({ onBox }: { onBox: (box: THREE.Box3) => void }) {
  const gltf = useLoader(GLTFLoader, "/3D/blueprint.glb");
  const chrome = useChrome();
  const group = useRef<THREE.Group>(null);

  // Prepare materials + orientation (model is Z-up)
  useEffect(() => {
    console.log('Applying chrome material to GLTF scene...');
    
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        console.log('Found mesh:', mesh.name, 'Current material:', mesh.material);
        
        // Ensure geometry has proper normals for smooth shading
        if (!mesh.geometry.attributes.normal) {
          mesh.geometry.computeVertexNormals();
        }
        
        // Apply smooth shading
        mesh.geometry.computeVertexNormals();
        
        // Clear any existing materials completely
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => {
            if (mat) mat.dispose();
          });
        } else if (mesh.material) {
          mesh.material.dispose();
        }
        
        // Create a simple paper-like material
        const paperMaterial = new THREE.MeshLambertMaterial({
          color: 0xffffff, // Pure white
          side: THREE.DoubleSide,
        });
        
        mesh.material = paperMaterial;
        console.log('Applied paper material:', paperMaterial);
        
        // Ensure the mesh is properly positioned and scaled
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        
        // Force update the material
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => mat.needsUpdate = true);
        } else {
          mesh.material.needsUpdate = true;
        }
      }
    });
    gltf.scene.rotation.x = 0; // GLB files are usually already oriented correctly
    gltf.scene.rotation.z = 0; // Ensure it sits on its base
    console.log('Material application complete');
  }, [gltf, chrome]);

  // Compute the box once the model is ready
  useEffect(() => {
    if (!group.current) return;
    
    const box = new THREE.Box3().setFromObject(group.current);
    onBox(box);
  }, [gltf, onBox]);

         // Optimized slow rotation
         useFrame(({ clock }) => {
           if (!group.current) return;
           
           // Reduce frame rate to 30fps for smooth performance
           const t = clock.getElapsedTime();
           if (Math.floor(t * 30) % 2 !== 0) return; // Skip every other frame to get ~30fps
           
           group.current.rotation.z += ROT_SPEED;
         });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  );
}

       function OrthoController({
         box,
         padding = PADDING,
       }: {
         box: THREE.Box3 | null;
         padding?: number;
       }) {
         const { camera, size } = useThree();
         const cam = camera as THREE.OrthographicCamera;

         const fit = useCallback(() => {
           if (!box || size.width === 0 || size.height === 0) return;

           // model dimensions in world units (after rotation)
           const dims = new THREE.Vector3();
           box.getSize(dims);

           const vw = size.width;
           const vh = size.height;
           if (vw <= 0 || vh <= 0) return;

           // compute zoom to fit with padding
           const w = Math.max(dims.x, 1e-6);
           const h = Math.max(dims.y, 1e-6);
           const zoom = Math.min(vw / (w * padding), vh / (h * padding));
           cam.zoom = zoom;

           // center the view on the model's bounding-box center
           const center = new THREE.Vector3();
           box.getCenter(center);

           const dir = new THREE.Vector3(-1, 1, 1).normalize();
           const dist = 200; // feel free to tweak
           cam.position.copy(center).addScaledVector(dir, dist);

           cam.up.set(0, 0, 1);
           cam.lookAt(center);
           cam.updateProjectionMatrix();
         }, [box, size.width, size.height, cam, padding]);

         useEffect(() => {
           fit();
         }, [fit]);

         return null;
       }

export default function BlueprintModelComponent() {
  const [box, setBox] = React.useState<THREE.Box3 | null>(null);

  return (
    <>
      <BlueprintModel onBox={setBox} />
      <OrthoController box={box} />
    </>
  );
}
