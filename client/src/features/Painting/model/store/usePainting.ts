import type { PaintingTools } from 'entities/Tool';
import { create } from 'zustand';

interface IPaintingStore {
  fillColor: string;
  strokeColor: string;
  currentTool: PaintingTools;
  setCurrentTool: (tool: PaintingTools) => void;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
}

export const usePainting = create<IPaintingStore>(set => ({
  currentTool: 'brush',
  fillColor: '#fff',
  strokeColor: '#000',
  setCurrentTool: (tool): void => set({ currentTool: tool }),
  setFillColor: (color): void => set({ fillColor: color }),
  setStrokeColor: (color): void => set({ strokeColor: color })
}));
