import { Brush, Circle, Eraser, Line, Rectangle } from '../scheme';
import type { ToolClasses } from '../types';

export const canvasTools: ToolClasses = {
  brush: Brush,
  line: Line,
  rectangle: Rectangle,
  circle: Circle,
  eraser: Eraser
};
