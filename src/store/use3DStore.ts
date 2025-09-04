import { create } from "zustand";

type CameraState = {
  position: [number, number, number] | null;
  zoom: number | null;
  up: [number, number, number] | null;
  fitted: boolean;
  setCameraState: (p: { position: [number, number, number]; zoom: number; up: [number, number, number] }) => void;
  setFitted: (b: boolean) => void;
};

export const useCameraStore = create<CameraState>((set) => ({
  position: null,
  zoom: null,
  up: null,
  fitted: false,
  setCameraState: ({ position, zoom, up }) => set({ position, zoom, up }),
  setFitted: (b) => set({ fitted: b }),
}));
