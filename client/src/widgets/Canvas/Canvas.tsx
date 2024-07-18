import { canvasTools, usePainting } from 'features/Painting';
import { type FC, memo, useEffect, useRef } from 'react';

import module from './Canvas.module.scss';

export const Canvas: FC = memo(() => {
  const currentTool = usePainting(state => state.currentTool);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ClassToCreate = canvasTools[currentTool];
      new ClassToCreate(canvas);
    }
  }, [currentTool]);

  return (
    <main className={module.Wrapper}>
      <canvas
        ref={canvasRef}
        className={module.Canvas}
        width={600}
        height={400}
      />
    </main>
  );
});
