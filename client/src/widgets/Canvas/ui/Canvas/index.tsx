import { canvasTools, usePainting } from 'features/Painting';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { type FC, memo, useEffect, useRef } from 'react';

import { Canvas as CanvasClass } from 'entities/Tool';
import module from './Canvas.module.scss';
import type { IMouseCoords } from '../LiveCursor';
import { LiveCursor } from '../LiveCursor';

export const Canvas: FC = memo(() => {
  const [mouseCoords, setMouseCoords] = useState<IMouseCoords | null>(null);

  const setCanvas = usePainting(state => state.setCanvas);
  const options = usePainting(state => state.options);
  const currentTool = usePainting(state => state.currentTool);
  const addImage = usePainting(state => state.addImage);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const savingImage = localStorage.getItem('saveImage');

      if (savingImage) {
        const canvas = new CanvasClass(canvasRef.current);
        canvas.drawImage(savingImage);
      }

      setCanvas(canvasRef.current);
    }
  }, [setCanvas]);

  useEffect(() => {
    if (canvasRef.current) {
      const ClassToCreate = canvasTools[currentTool];
      new ClassToCreate(canvasRef.current, options);
    }
  }, [options, currentTool]);

  const addImageHandler: MouseEventHandler<HTMLCanvasElement> = (e): void => {
    addImage(e.currentTarget.toDataURL());
  };

  const mouseMoveHandler: MouseEventHandler<HTMLCanvasElement> = (
    event
  ): void => {
    const { clientX, clientY } = event;
    setMouseCoords({ x: clientX, y: clientY });
  };

  const mouseLeaveHandler: MouseEventHandler<HTMLCanvasElement> = (): void => {
    setMouseCoords(null);
  };

  return (
    <main className={module.wrapper}>
      <canvas
        ref={canvasRef}
        className={module.canvas}
        onMouseUp={addImageHandler}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={mouseLeaveHandler}
        width={600}
        height={400}
      />
      <LiveCursor cords={mouseCoords} diameter={options.strokeWidth * 2} />
    </main>
  );
});
