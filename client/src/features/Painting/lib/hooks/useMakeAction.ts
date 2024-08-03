import { emptyCanvas, usePainting } from 'features/Painting';
import type { ActionTools } from 'entities/Tool';
import { Canvas } from 'entities/Tool';
import { useShallow } from 'zustand/react/shallow';

type UseMakeAction = ((action: ActionTools) => void) | undefined;

export const useMakeAction = (): UseMakeAction => {
  const {
    canvas: canvasRef,
    canceledImageList,
    addImage,
    addCanceledImage,
    imageList,
    reset
  } = usePainting(
    useShallow(
      ({
        canvas,
        canceledImageList,
        addImage,
        addCanceledImage,
        imageList,
        reset
      }) => ({
        canvas,
        canceledImageList,
        addImage,
        addCanceledImage,
        imageList,
        reset
      })
    )
  );

  if (!canvasRef) return;

  const canvas = new Canvas(canvasRef);

  const clearAll = (): void => {
    canvas.clearAll();
    const emptyCanvasImage = canvasRef.toDataURL();
    addImage(emptyCanvasImage);
  };

  const undo = (): void => {
    const lastCanvasImage = imageList.pop() ?? '';
    addCanceledImage(lastCanvasImage);

    if (imageList.length > 0) {
      const prevCanvasImage = imageList[imageList.length - 1] ?? '';
      canvas.drawImage(prevCanvasImage);
    } else {
      const saveImage = localStorage.getItem('saveImage');

      if (saveImage) {
        canvas.drawImage(saveImage);
      } else {
        canvas.clearAll();
      }
    }
  };

  const redo = (): void => {
    if (canceledImageList.length > 0) {
      const dataUrl = canceledImageList.pop() ?? '';
      addImage(dataUrl);
      canvas.drawImage(dataUrl);
    }
  };

  const save = (): void => {
    const lastImage = imageList.pop() ?? '';
    canvas.drawImage(lastImage);

    if (lastImage === emptyCanvas) {
      localStorage.removeItem('saveImage');
    } else {
      localStorage.setItem('saveImage', lastImage);
    }

    reset();
  };

  const download = (): void => {
    canvas.download();
  };

  const actionObject: Record<ActionTools, () => void> = {
    clearAll,
    undo,
    redo,
    save,
    download
  };

  return (action: ActionTools): void => actionObject[action]();
};
