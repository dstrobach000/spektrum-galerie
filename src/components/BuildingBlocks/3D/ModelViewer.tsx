import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { Bounds, OrthographicCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

// Chrome-like material
function useChrome() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.08,
        envMapIntensity: 2.0,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
    []
  );
}

function GalleryModel() {
  const gltf = useLoader(GLTFLoader, "/3D/spektrum_galerie.glb");
  const groupRef = useRef<THREE.Group>(null);
  const chromeMaterial = useChrome();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = chromeMaterial;
        if (mesh.geometry && !mesh.geometry.attributes.normal) {
          mesh.geometry.computeVertexNormals();
        }
      }
    });

    // Match original Z-up coordinate system
    gltf.scene.rotation.x = -Math.PI / 2;
  }, [gltf, chromeMaterial]);

  useFrame(() => {
    if (groupRef.current?.rotation) {
      groupRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    const d = 200;
    camera.position.set(-d, d, d);
    camera.up.set(0, 0, 1); // Z-up
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
    dpr={[1, 2]}
    onCreated={({ gl, scene }) => {
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = 1.5;
      gl.outputColorSpace = THREE.SRGBColorSpace;

      const pmrem = new THREE.PMREMGenerator(gl);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
    }}
  >
    <OrthographicCamera makeDefault zoom={60} near={-1000} far={1000} />
    <CameraController />
    <ambientLight intensity={0.4} />
    <Suspense fallback={null}>
      <Bounds fit clip observe margin={1.1}>
        <GalleryModel />
      </Bounds>
    </Suspense>
  </Canvas>
);

export default ModelViewer;
