"use client";

import React, {
  Suspense,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import clsx from "clsx";

type Props = {
  src: string;          // e.g. "/3D/logo.glb"
  speed?: number;       // seconds per left↔right swing
  className?: string;
};

/** Tweak if import is flipped (flip X sign if needed). */
const ORIENTATION: [number, number, number] = [Math.PI / 2, 0, 0];
const PADDING = 0.88; // 0.86–0.92 tighter/looser
const TILT_X = 0.12;  // small tilt to help depth read

/* Y‑axis pendulum (outermost) */
function Swing({ children, speed = 6 }: { children: React.ReactNode; speed?: number }) {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = Math.sin((t / speed) * Math.PI * 2) * THREE.MathUtils.degToRad(10);
    g.current.rotation.y = angle;
  });
  return <group ref={g}>{children}</group>;
}

/* Chrome material */
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

/** Stable fit that:
 *  - waits until the canvas has a non-zero size,
 *  - disables tilt while measuring,
 *  - centers once and caches base size (scale=1),
 *  - only rescales from cache on resize.
 */
function useStableFit(
  holderRef: React.MutableRefObject<THREE.Object3D | null>,
  modelRef: React.MutableRefObject<THREE.Object3D | null>,
  tiltRef: React.MutableRefObject<THREE.Object3D | null>,
  padding = PADDING
) {
  const { camera, size, gl } = useThree();
  const baseDims = useRef<THREE.Vector3 | null>(null);
  const centered = useRef(false);

  const applyScaleFromBase = useCallback(() => {
    const holder = holderRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    const base = baseDims.current;
    if (!holder || !cam.isPerspectiveCamera || !base) return;
    if (size.width <= 0 || size.height <= 0) return;

    const z = Math.abs(cam.position.z);
    const frustumH = 2 * Math.tan((cam.fov * Math.PI) / 180 / 2) * z;
    const frustumW = frustumH * (size.width / size.height);
    const k = padding * Math.min(frustumW / (base.x || 1), frustumH / (base.y || 1));
    if (isFinite(k) && k > 0) holder.scale.setScalar(k);
  }, [camera, size.width, size.height, padding, holderRef]);

  // Measure once (after load) when canvas size is valid
  useEffect(() => {
    const holder = holderRef.current;
    const model = modelRef.current;
    const tilt = tiltRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    if (!holder || !model || !tilt || !cam.isPerspectiveCamera) return;
    if (size.width <= 0 || size.height <= 0) return; // canvas not ready
    if (centered.current && baseDims.current) return; // already done

    // Reset transforms
    holder.position.set(0, 0, 0);
    holder.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(...ORIENTATION);
    model.scale.set(1, 1, 1);

    const prevTiltX = tilt.rotation.x;
    tilt.rotation.x = 0; // turn off tilt while measuring

    // Use two RAFs to ensure world matrices & GLB are fully settled
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Build a box by expanding over all meshes (more reliable)
        const box = new THREE.Box3();
        model.updateMatrixWorld(true);
        box.expandByObject(model);

        const dims = new THREE.Vector3();
        box.getSize(dims);
        if (!isFinite(dims.x) || !isFinite(dims.y) || dims.x <= 0 || dims.y <= 0) {
          tilt.rotation.x = prevTiltX; // restore even if not ready
          return;
        }

        // Center at origin
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        model.updateMatrixWorld(true);

        // Cache base size at scale=1 (measure holder which contains the centered model)
        const sized = new THREE.Box3().setFromObject(holder);
        const base = new THREE.Vector3();
        sized.getSize(base);
        baseDims.current = base;
        centered.current = true;

        // Restore tilt and apply scale
        tilt.rotation.x = prevTiltX;
        applyScaleFromBase();
      });
    });
    return () => cancelAnimationFrame(id);
  }, [camera, size.width, size.height, gl, holderRef, modelRef, tiltRef, applyScaleFromBase]);

  // Only rescale on resize using cached base dims
  useEffect(() => {
    applyScaleFromBase();
  }, [applyScaleFromBase, size.width, size.height]);
}

function LogoModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const chrome = useChrome();

  // Clone & apply chrome
  const root = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.material = chrome;
        if (m.geometry && !m.geometry.attributes.normal) m.geometry.computeVertexNormals();
        m.castShadow = false;
        m.receiveShadow = false;
      }
    });
    return s;
  }, [scene, chrome]);

  // Tree: Swing → Tilt → Holder (scaled) → Model (oriented & centered) → primitive
  const tiltRef = useRef<THREE.Group>(null);
  const holderRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  useStableFit(holderRef, modelRef, tiltRef, PADDING);

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

          // neutral studio reflections for chrome
          const pmrem = new THREE.PMREMGenerator(gl);
          const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
          scene.environment = envTex;
        }}
      >
        <ambientLight intensity={0.4} />
        {/* no loading text */}
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
