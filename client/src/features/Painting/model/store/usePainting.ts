import type { PaintingTools } from 'entities/Tool';
import { create } from 'zustand';

interface IPaintingStore {
  fillColor: string;
  strokeColor: string;
  currentTool: PaintingTools;
  strokeWidth: number;
  setCurrentTool: (tool: PaintingTools) => void;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
}

export const usePainting = create<IPaintingStore>(set => ({
  currentTool: 'brush',
  fillColor: '#fff',
  strokeColor: '#000',
  strokeWidth: 1,
  setCurrentTool: (tool): void => set({ currentTool: tool }),
  setFillColor: (color): void => set({ fillColor: color }),
  setStrokeColor: (color): void => set({ strokeColor: color }),
  setStrokeWidth: (width): void => set({ strokeWidth: width })
}));
