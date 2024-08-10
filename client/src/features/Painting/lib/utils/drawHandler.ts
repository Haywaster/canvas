import type { ICanvasBaseConfig, IDrawConnection } from 'features/Connection';
import { Brush, Circle, Eraser, Line, Rectangle } from 'features/Painting';
import type { PaintingTools } from 'entities/Tool';

const brushPainting = (
  currentTool: PaintingTools,
  context: CanvasRenderingContext2D,
  canvasConfig: ICanvasBaseConfig
): void => {
  if (currentTool === 'brush') {
    return Brush.draw(context, canvasConfig);
  }

  if (currentTool === 'eraser') {
    return Eraser.draw(context, canvasConfig);
  }
};

const makePaintAction = (
  currentTool: PaintingTools,
  context: CanvasRenderingContext2D,
  canvasConfig: IDrawConnection['figure']
) => {
  switch (canvasConfig.name) {
    case 'brush':
      return brushPainting(currentTool, context, canvasConfig);
    case 'line':
      return Line.draw(context, canvasConfig);
    case 'rectangle':
      return Rectangle.draw(context, canvasConfig);
    case 'circle':
      return Circle.draw(context, canvasConfig);
    case 'finish':
      return context.beginPath();
  }
};

export const drawHandler = (
  data: IDrawConnection,
  canvas: HTMLCanvasElement | null,
  currentTool: PaintingTools
) => {
  const context = canvas?.getContext('2d');
  if (!context) return;
  makePaintAction(currentTool, context, data.figure);
};
