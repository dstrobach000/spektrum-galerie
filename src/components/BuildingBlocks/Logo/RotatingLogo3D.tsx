"use client";

import React, { Suspense, useMemo, useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import clsx from "clsx";

type Props = {
  src: string;
  speed?: number;
  className?: string;
};

const ORIENTATION: [number, number, number] = [Math.PI / 2, 0, 0];
const PADDING = 0.88;
const TILT_X = 0.12;

function Swing({ children, speed = 6 }: { children: React.ReactNode; speed?: number }) {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = Math.sin((t / speed) * Math.PI * 2) * THREE.MathUtils.degToRad(10);
    g.current.rotation.y = angle;
  });
  return <group ref={g}>{children}</group>;
}

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

function useResponsiveCamera(
  holderRef: React.MutableRefObject<THREE.Object3D | null>,
  modelRef: React.MutableRefObject<THREE.Object3D | null>,
  tiltRef: React.MutableRefObject<THREE.Object3D | null>,
  padding = PADDING
) {
  const { camera, size } = useThree();
  const baseDims = useRef<THREE.Vector3 | null>(null);
  const centered = useRef(false);

  const updateZoom = useCallback(() => {
    const holder = holderRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    const base = baseDims.current;
    if (!holder || !base || !cam.isPerspectiveCamera) return;

    const z = Math.abs(cam.position.z);
    const frustumH = 2 * Math.tan((cam.fov * Math.PI) / 180 / 2) * z;
    const frustumW = frustumH * (size.width / size.height);
    const k = padding * Math.min(frustumW / (base.x || 1), frustumH / (base.y || 1));
    if (isFinite(k) && k > 0) holder.scale.setScalar(k);
  }, [camera, size.width, size.height, padding, holderRef]);

  useEffect(() => {
    const holder = holderRef.current;
    const model = modelRef.current;
    const tilt = tiltRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    if (!holder || !model || !tilt || !cam.isPerspectiveCamera) return;
    if (size.width <= 0 || size.height <= 0) return;
    if (centered.current && baseDims.current) return;

    holder.position.set(0, 0, 0);
    holder.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(...ORIENTATION);
    model.scale.set(1, 1, 1);

    const prevTiltX = tilt.rotation.x;
    tilt.rotation.x = 0;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const box = new THREE.Box3().setFromObject(model);
        const dims = new THREE.Vector3();
        box.getSize(dims);
        if (!isFinite(dims.x) || !isFinite(dims.y)) {
          tilt.rotation.x = prevTiltX;
          return;
        }

        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        model.updateMatrixWorld(true);

        const sized = new THREE.Box3().setFromObject(holder);
        const base = new THREE.Vector3();
        sized.getSize(base);
        baseDims.current = base;
        centered.current = true;

        tilt.rotation.x = prevTiltX;
        updateZoom();
      });
    });
    return () => cancelAnimationFrame(id);
  }, [camera, size, modelRef, holderRef, tiltRef, updateZoom]);

  useEffect(() => {
    updateZoom();
  }, [updateZoom]);
}

function LogoModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const chrome = useChrome();

  const root = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.material = chrome;
        if (!m.geometry.attributes.normal) m.geometry.computeVertexNormals();
      }
    });
    return s;
  }, [scene, chrome]);

  const tiltRef = useRef<THREE.Group>(null);
  const holderRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  useResponsiveCamera(holderRef, modelRef, tiltRef, PADDING);

  return (
    <group ref={tiltRef} rotation={[TILT_X, 0, 0]}>
      <group ref={holderRef}>
        <group ref={modelRef}>
          <primitive object={root} />
        </group>
      </group>
    </group>
  );
}

const RotatingLogo3D: React.FC<Props> = ({ src, speed = 6, className = "" }) => {
  return (
    <div className={clsx("w-full h-full", className)} style={{ perspective: 1000 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
          gl.outputColorSpace = THREE.SRGBColorSpace;

          const pmrem = new THREE.PMREMGenerator(gl);
          const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
          scene.environment = envTex;
        }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Swing speed={speed}>
            <LogoModel url={src} />
          </Swing>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RotatingLogo3D;
