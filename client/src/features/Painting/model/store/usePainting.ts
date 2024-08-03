import type { PaintingTools, PaintingOptions } from 'entities/Tool';
import { create } from 'zustand';

interface State {
  canvas: HTMLCanvasElement | null;
  currentTool: PaintingTools;
  options: PaintingOptions;
  imageList: string[];
  canceledImageList: string[];
}

interface Actions {
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setCurrentTool: (tool: PaintingTools) => void;
  setOptions: (key: keyof PaintingOptions, value: string | number) => void;
  addImage: (image: string) => void;
  addCanceledImage: (image: string) => void;
  reset: () => void;
}

const defaultOptions: PaintingOptions = {
  strokeColor: '#000000',
  strokeWidth: 1,
  fillColor: '#ffffff'
};

export const usePainting = create<State & Actions>()(set => ({
  canvas: null,
  imageList: [],
  canceledImageList: [],
  currentTool: 'brush',
  options: defaultOptions,
  setCanvas: (canvas): void => set({ canvas }),
  setCurrentTool: (tool): void => set({ currentTool: tool }),
  setOptions: (key, value): void =>
    set(({ options }) => ({
      options: {
        ...options,
        [key]: value
      }
    })),
  addImage: image => set(state => ({ imageList: [...state.imageList, image] })),
  addCanceledImage: image =>
    set(state => ({ canceledImageList: [...state.canceledImageList, image] })),
  reset: () => set({ imageList: [], canceledImageList: [] })
}));
