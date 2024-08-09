import { canvasTools, usePainting } from 'features/Painting';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { type FC, memo, useEffect, useRef } from 'react';

import module from './Canvas.module.scss';
import type { IMouseCoords } from '../LiveCursor';
import { LiveCursor } from '../LiveCursor';
import { useConnection } from 'features/Connection';

const diameterCoef = 2;

export const Canvas: FC = memo(() => {
  const [mouseCoords, setMouseCoords] = useState<IMouseCoords | null>(null);

  const setCanvas = usePainting(state => state.setCanvas);
  const options = usePainting(state => state.options);
  const currentTool = usePainting(state => state.currentTool);
  const addImage = usePainting(state => state.addImage);
  const socket = useConnection(state => state.socket);
  const sessionId = useConnection(state => state.sessionId);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, [setCanvas]);

  useEffect(() => {
    if (canvasRef.current && socket && sessionId) {
      const ClassToCreate = canvasTools[currentTool];
      new ClassToCreate(canvasRef.current, socket, sessionId, options);
    }
  }, [options, currentTool, socket, sessionId]);

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
      <LiveCursor
        cords={mouseCoords}
        diameter={options.strokeWidth * diameterCoef}
      />
    </main>
  );
});
