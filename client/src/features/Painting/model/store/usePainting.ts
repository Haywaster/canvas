import type { PaintingTools, PaintingOptions } from 'entities/Tool';
import { create } from 'zustand';

interface IPaintingStore {
  currentTool: PaintingTools;
  setCurrentTool: (tool: PaintingTools) => void;
  options: PaintingOptions;
  setOptions: (key: keyof PaintingOptions, value: string | number) => void;
}

const defaultOptions: PaintingOptions = {
  strokeColor: '#000000',
  strokeWidth: 1,
  fillColor: '#ffffff'
};

export const usePainting = create<IPaintingStore>(set => ({
  currentTool: 'brush',
  options: defaultOptions,
  setCurrentTool: (tool): void => set({ currentTool: tool }),
  setOptions: (key, value): void =>
    set(state => ({
      options: {
        ...state.options,
        [key]: value
      }
    }))
}));
