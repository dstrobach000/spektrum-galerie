import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { Html, useProgress, Bounds, OrthographicCamera } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

// Loader overlay
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

// The model as a wireframe, spinning isometrically
function GalleryModel() {
  const obj = useLoader(OBJLoader, "/3D/spektrum_galerie.obj");
  const groupRef = useRef();

  // Make all materials wireframe and set color
  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = true;
        child.material.color = new THREE.Color("#111"); // Or your preferred wire color
      }
    });
  }, [obj]);

  // Spin around Z axis for isometric effect
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
}

// CameraController for isometric Z-up view
function CameraController() {
  const { camera } = useThree();
  React.useEffect(() => {
    const d = 200;
    camera.position.set(-d, d, d); // Isometric for Z-up models
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
    eventSource={null}
  >
    <OrthographicCamera makeDefault zoom={60} near={-1000} far={1000} />
    <CameraController />
    <ambientLight intensity={1.5} />
    <directionalLight position={[100, 100, 100]} intensity={2} />
    <Suspense fallback={<Loader />}>
      <Bounds fit clip observe margin={1}>
        <GalleryModel />
      </Bounds>
    </Suspense>
  </Canvas>
);

export default ModelViewer;
