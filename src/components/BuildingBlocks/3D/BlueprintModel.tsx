"use client";

import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PADDING = 2.1; // space around the model
const ROT_SPEED = 0.22; // Balanced rotation speed for good performance

function BlueprintModel({ onBox }: { onBox: (box: THREE.Box3) => void }) {
  const gltf = useLoader(GLTFLoader, "/3D/blueprint.glb");
  const group = useRef<THREE.Group>(null);
  const scene = useMemo(() => {
    // Clone so we never mutate/dispose the globally cached GLTF scene.
    const s = gltf.scene.clone(true);
    s.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    s.rotation.set(0, 0, 0);
    return s;
  }, [gltf]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m?.dispose?.());
          } else {
            mesh.material?.dispose?.();
          }
        }
      });
    };
  }, [scene]);

  // Compute the box once the model is ready
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    onBox(box);
  }, [scene, onBox]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.z = t * ROT_SPEED;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
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

useGLTF.preload("/3D/blueprint.glb");
