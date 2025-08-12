import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { Bounds, OrthographicCamera } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

function GalleryModel() {
  const obj = useLoader(OBJLoader, "/3D/spektrum_galerie.obj");
  const groupRef = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff", // pure white
        metalness: 0,
        roughness: 0,
      }),
    []
  );

  useEffect(() => {
    obj.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });
  }, [obj, material]);

  useFrame(() => {
    if (groupRef.current && groupRef.current.rotation) {
      groupRef.current.rotation.z += 0.005;
    }
  });

  // No manual scaling if you're using <Bounds fit ...>!
  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  React.useEffect(() => {
    const d = 200;
    camera.position.set(-d, d, d);
    camera.up.set(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

const ModelViewer = () => (
  <Canvas
    className="w-full h-full block"
    style={{
      background: "#fff",
      width: "100%",
      height: "100%",
      display: "block",
    }}
  >
    <OrthographicCamera makeDefault zoom={60} near={-1000} far={1000} />
    <CameraController />
    <ambientLight intensity={0.7} />
    <directionalLight position={[100, 100, 100]} intensity={1.3} />
    <directionalLight position={[-100, -100, 100]} intensity={0.5} />
    <Suspense fallback={null}>
      <Bounds fit clip margin={1.1}>
        <GalleryModel />
      </Bounds>
    </Suspense>
  </Canvas>
);

export default ModelViewer;