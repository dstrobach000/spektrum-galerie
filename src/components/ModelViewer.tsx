import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { Html, useProgress, Bounds, OrthographicCamera } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function GalleryModel() {
  const obj = useLoader(OBJLoader, "/3D/spektrum_galerie.obj");
  const groupRef = useRef<THREE.Group>(null);

  // Black wireframe material
  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      }),
    []
  );

  useEffect(() => {
    obj.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = wireMaterial;
      }
    });
  }, [obj, wireMaterial]);

  useFrame(() => {
    if (groupRef.current && groupRef.current.rotation) {
      groupRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
}

// CameraController for Z-up isometric angle
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
    style={{ background: "#fff", width: "100%", height: "100%" }}
  >
    <OrthographicCamera makeDefault zoom={60} near={-1000} far={1000} />
    <CameraController />
    <ambientLight intensity={1.5} />
    <directionalLight position={[100, 100, 100]} intensity={2} />
    <Suspense fallback={<Loader />}>
      <Bounds fit clip margin={1}>
        <GalleryModel />
      </Bounds>
    </Suspense>
  </Canvas>
);

export default ModelViewer;
