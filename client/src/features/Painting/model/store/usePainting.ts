import type {
  PaintingTools,
  PaintingOptions,
  ActionTools
} from 'entities/Tool';
import { create } from 'zustand';
import { canvasTools, canvasActions } from '../const';

interface IPaintingStore {
  canvas: HTMLCanvasElement | null;
  setCanvas: (canvas: HTMLCanvasElement | null) => void;
  currentTool: PaintingTools;
  setCurrentTool: (tool: PaintingTools) => void;
  options: PaintingOptions;
  setOptions: (key: keyof PaintingOptions, value: string | number) => void;
  makeAction: (tool: ActionTools) => void;
}

const defaultOptions: PaintingOptions = {
  strokeColor: '#000000',
  strokeWidth: 1,
  fillColor: '#ffffff'
};

export const usePainting = create<IPaintingStore>((set, getState) => ({
  canvas: null,
  currentTool: 'brush',
  options: defaultOptions,
  setCanvas: (canvas): void => {
    if (canvas) {
      const { options, currentTool } = getState();

      const ClassToCreate = canvasTools[currentTool];
      new ClassToCreate(canvas, options);
    }
    set({ canvas });
  },
  setCurrentTool: (tool): void => set({ currentTool: tool }),
  setOptions: (key, value): void =>
    set(state => ({
      options: {
        ...state.options,
        [key]: value
      }
    })),
  makeAction: action => {
    const { canvas } = getState();

    if (canvas) {
      const ClassToCreate = canvasActions[action as 'clearAll'];
      new ClassToCreate(canvas);
    }
  }
}));
