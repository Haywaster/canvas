import { create } from 'zustand';
import {PaintingTools} from 'entities/Tool'

interface IPaintingStore {
  fillColor: string
  strokeColor: string
  currentTool: PaintingTools
  setCurrentTool: (tool: PaintingTools) => void
  setFillColor: (color: string) => void
  setStrokeColor: (color: string) => void
}

export const usePainting = create<IPaintingStore>((set) => ({
  currentTool: 'brush',
  fillColor: '#fff',
  strokeColor: '#000',
  setCurrentTool: (tool) => set((state) => ({...state, currentTool: tool})),
  setFillColor: (color) => set((state) => ({...state, fillColor: color})),
  setStrokeColor: (color) => set((state) => ({...state, strokeColor: color})),
}))