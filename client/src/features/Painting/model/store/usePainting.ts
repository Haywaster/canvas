import type {
  PaintingTools,
  PaintingOptions,
  ActionTools
} from 'entities/Tool';
import { Canvas } from 'entities/Tool';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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
  makeAction: (tool: ActionTools) => void;
  addImage: (image: string) => void;
  addCanceledImage: (image: string) => void;
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
    setCanvas: (canvas): void => set({ canvas }),
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

      if (!canvasRef) return;

      const canvas = new Canvas(canvasRef);

      const clearAll = () => {
        canvas.clearAll();
        set(state => {
          const emptyCanvasImage = canvasRef.toDataURL();
          state.imageList.push(emptyCanvasImage);
        });
      };

      const undo = () => {
        if (imageList.length > 0) {
          set(state => {
            const lastCanvasImage = state.imageList.pop() ?? '';
            state.canceledImageList.push(lastCanvasImage);

            if (state.imageList.length > 0) {
              const prevCanvasImage =
                state.imageList[state.imageList.length - 1] ?? '';
              canvas.draw(prevCanvasImage);
            } else {
              canvas.clearAll();
            }
          });
        }
      };

      const redo = () => {
        if (canceledImageList.length > 0) {
          set(state => {
            const dataUrl = state.canceledImageList.pop() ?? '';
            state.imageList.push(dataUrl);
            canvas.draw(dataUrl);
          });
        }
      };

      const save = () => {
        set(state => {
          const lastImage = state.imageList.pop() ?? '';
          canvas.draw(lastImage);
          localStorage.setItem('saveImage', lastImage);
          state.imageList = [];
          state.canceledImageList = [];
        });
      };

      switch (action) {
        case 'clearAll':
          clearAll();
          break;
        case 'undo':
          undo();
          break;
        case 'redo':
          redo();
          break;
        case 'save':
          save();
          break;
      }
    },
    addImage: image =>
      set(state => {
        state.imageList.push(image);
      }),
    addCanceledImage: image =>
      set(state => {
        state.canceledImageList.push(image);
      })
  }))
);
