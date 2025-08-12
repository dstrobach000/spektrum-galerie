// src/components/BuildingBlocks/3D/useStableFit.ts
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type Ref3D = React.MutableRefObject<THREE.Object3D | null>;

export function useStableFitPerspective(
  holderRef: Ref3D,
  modelRef: Ref3D,
  {
    padding = 0.88,
    orient = [0, 0, 0] as [number, number, number],
    // optional: a parent that’s tilted — we disable it while measuring
    tiltRef,
  }: { padding?: number; orient?: [number, number, number]; tiltRef?: Ref3D } = {}
) {
  const { camera, size } = useThree();
  const baseDims = useRef<THREE.Vector3 | null>(null);
  const measured = useRef(false);

  const scaleFromBase = useCallback(() => {
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

  useLayoutEffect(() => {
    const holder = holderRef.current;
    const model = modelRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    if (!holder || !model || !cam.isPerspectiveCamera) return;
    if (measured.current) return;

    holder.position.set(0, 0, 0);
    holder.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(...orient);
    model.scale.set(1, 1, 1);

    const prevTilt = tiltRef?.current?.rotation.x ?? 0;
    if (tiltRef?.current) tiltRef.current.rotation.x = 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().expandByObject(model);
        const dims = new THREE.Vector3();
        box.getSize(dims);
        if (!isFinite(dims.x) || !isFinite(dims.y) || dims.x <= 0 || dims.y <= 0) {
          if (tiltRef?.current) tiltRef.current.rotation.x = prevTilt;
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
        measured.current = true;

        if (tiltRef?.current) tiltRef.current.rotation.x = prevTilt;
        scaleFromBase();
      });
    });
  }, [camera, holderRef, modelRef, tiltRef, orient, scaleFromBase]);

  useEffect(() => {
    scaleFromBase();
  }, [scaleFromBase, size.width, size.height]);
}

export function useStableFitOrtho(
  holderRef: Ref3D,
  modelRef: Ref3D,
  { padding = 0.9 }: { padding?: number } = {}
) {
  const { camera, size } = useThree();
  const baseDims = useRef<THREE.Vector3 | null>(null);
  const measured = useRef(false);

  const scaleFromBase = useCallback(() => {
    const holder = holderRef.current;
    const cam = camera as THREE.OrthographicCamera;
    const base = baseDims.current;
    if (!holder || !cam.isOrthographicCamera || !base) return;
    if (size.width <= 0 || size.height <= 0) return;

    const frustumH = (cam.top - cam.bottom) / cam.zoom;
    const frustumW = frustumH * (size.width / size.height);
    const k = padding * Math.min(frustumW / (base.x || 1), frustumH / (base.y || 1));
    if (isFinite(k) && k > 0) holder.scale.setScalar(k);
  }, [camera, size.width, size.height, padding, holderRef]);

  useLayoutEffect(() => {
    const holder = holderRef.current;
    const model = modelRef.current;
    const cam = camera as THREE.OrthographicCamera;
    if (!holder || !model || !cam.isOrthographicCamera) return;
    if (measured.current) return;

    holder.position.set(0, 0, 0);
    holder.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const box = new THREE.Box3().expandByObject(model);
        const dims = new THREE.Vector3();
        box.getSize(dims);
        if (!isFinite(dims.x) || !isFinite(dims.y) || dims.x <= 0 || dims.y <= 0) return;

        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        model.updateMatrixWorld(true);

        const sized = new THREE.Box3().setFromObject(holder);
        const base = new THREE.Vector3();
        sized.getSize(base);
        baseDims.current = base;
        measured.current = true;

        scaleFromBase();
      });
    });
  }, [camera, holderRef, modelRef, scaleFromBase]);

  useEffect(() => {
    scaleFromBase();
  }, [scaleFromBase, size.width, size.height]);
}
