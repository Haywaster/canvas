import { Brush, Circle, Eraser, Line, Rectangle } from '../scheme';
import type { ActionClasses, ToolClasses } from '../types';
import { Canvas } from 'entities/Tool';

export const toolsClasses = [Brush, Circle, Eraser, Line, Rectangle] as const;

export const canvasTools: ToolClasses = {
  brush: Brush,
  line: Line,
  rectangle: Rectangle,
  circle: Circle,
  eraser: Eraser
};

export const canvasActions: Pick<ActionClasses, 'clearAll'> = {
  clearAll: Canvas.prototype.clearAll
};
