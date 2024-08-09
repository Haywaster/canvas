import type { ICanvasConfig, IConnection } from 'features/Connection';
import { Brush, Circle, Eraser, Line, Rectangle } from 'features/Painting';
import type { PaintingTools } from 'entities/Tool';

const brushPainting = (
  currentTool: PaintingTools,
  context: CanvasRenderingContext2D,
  canvasConfig: ICanvasConfig
) => {
  const { x, y, options } = canvasConfig;

  if (currentTool === 'brush') {
    return Brush.draw(context, x, y, options);
  }

  if (currentTool === 'eraser') {
    return Eraser.draw(context, x, y, options);
  }
};

export const drawHandler = (
  data: IConnection,
  canvas: HTMLCanvasElement | null,
  currentTool: PaintingTools
) => {
  const context = canvas?.getContext('2d');
  if (!context) return;

  const { x, y, startX = 0, startY = 0, saved = '', options } = data.figure;

  const actions = {
    brush: () => brushPainting(currentTool, context, data.figure),
    line: () => Line.draw(context, x, y, options, startX, startY, saved),
    rectangle: () =>
      Rectangle.draw(context, x, y, options, startX, startY, saved),
    circle: () => Circle.draw(context, x, y, options, startX, startY, saved),
    finish: () => context.beginPath()
  };

  actions[data.figure.name]();
};
