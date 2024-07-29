import { usePainting } from 'features/Painting';
import type { MouseEventHandler } from 'react';
import { type FC, memo, useEffect, useRef } from 'react';

import module from './Canvas.module.scss';

export const Canvas: FC = memo(() => {
  const setCanvas = usePainting(state => state.setCanvas);
  const options = usePainting(state => state.options);
  const currentTool = usePainting(state => state.currentTool);
  const addImage = usePainting(state => state.addImage);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvas(canvas);
  }, [setCanvas, options, currentTool]);

  const addImageHandler: MouseEventHandler<HTMLCanvasElement> = e => {
    addImage(e.currentTarget.toDataURL());
  };

  return (
    <main className={module.wrapper}>
      <canvas
        ref={canvasRef}
        className={module.canvas}
        onMouseUp={addImageHandler}
        width={600}
        height={400}
      />
    </main>
  );
});
