import type {
  PaintingTools,
  PaintingOptions,
  ActionTools
} from 'entities/Tool';
import { Canvas } from 'entities/Tool';
import { create } from 'zustand';
import { canvasTools } from '../const';
import { immer } from 'zustand/middleware/immer';

interface State {
  canvas: HTMLCanvasElement | null;
  currentTool: PaintingTools;
  options: PaintingOptions;
  imageList: string[];
  canceledImageList: string[];
}

interface Actions {
  setCanvas: (canvas: HTMLCanvasElement | null) => void;
  setCurrentTool: (tool: PaintingTools) => void;
  setOptions: (key: keyof PaintingOptions, value: string | number) => void;
  makeAction: (tool: ActionTools) => void;
  addImage: (image: string) => void;
  addCanceledImage: (image: string) => void;
  clearAll: () => void;
}

const defaultOptions: PaintingOptions = {
  strokeColor: '#000000',
  strokeWidth: 1,
  fillColor: '#ffffff'
};

export const usePainting = create<State & Actions>()(
  immer((set, getState) => ({
    canvas: null,
    imageList: [],
    canceledImageList: [],
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
      set(({ options }) => ({
        options: {
          ...options,
          [key]: value
        }
      })),
    makeAction: action => {
      const { canvas: canvasRef, imageList, canceledImageList } = getState();

      if (canvasRef) {
        const canvas = new Canvas(canvasRef);

        switch (action) {
          case 'clearAll':
            canvas.clearAll();
            set(state => {
              const emptyCanvasImage = canvasRef.toDataURL();
              state.imageList.push(emptyCanvasImage);
            });
            break;
          case 'undo': {
            if (imageList.length > 0) {
              set(state => {
                const lastCanvasImage = state.imageList.pop() ?? '';
                state.canceledImageList.push(lastCanvasImage);

                if (state.imageList.length > 0) {
                  const prevCanvasImage =
                    state.imageList[state.imageList.length - 1] ?? '';
                  canvas.undo(prevCanvasImage);
                } else {
                  canvas.clearAll();
                }
              });
            }
            break;
          }
          case 'redo': {
            if (canceledImageList.length > 0) {
              set(state => {
                const dataUrl = state.canceledImageList.pop() ?? '';
                state.imageList.push(dataUrl);
                canvas.undo(dataUrl);
              });
            }
            break;
          }
        }
      }
    },
    addImage: image =>
      set(state => {
        state.imageList.push(image);
      }),
    addCanceledImage: image =>
      set(state => {
        state.canceledImageList.push(image);
      }),
    clearAll: () =>
      set({
        imageList: [],
        canceledImageList: []
      })
  }))
);
