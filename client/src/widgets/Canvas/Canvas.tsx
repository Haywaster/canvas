import { type FC, memo, useEffect, useRef } from 'react';
import module from './Canvas.module.scss';
import { Tool } from 'entities/Tool';
import { Brush, Rectangle, usePainting } from 'features/Painting';

export const Canvas: FC = memo(() => {
  const currentTool = usePainting(state => state.currentTool);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      switch (currentTool) {
        case 'brush':
          new Brush(canvas)
          break;
        case 'rectangle':
          new Rectangle(canvas)
          break;
        default:
          new Tool(canvas)
          break;
      }
    }
  }, [currentTool]);
  
  return (
    <main className={ module.Wrapper }>
      <canvas ref={ canvasRef } className={ module.Canvas } width={ 600 } height={ 400 }/>
    </main>
  );
});
