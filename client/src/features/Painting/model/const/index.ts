import { Brush, Circle, ClearAll, Eraser, Line, Rectangle } from '../scheme';
import type { ToolClasses, ActionClasses } from '../types';

export const toolsClasses = [Brush, Circle, Eraser, Line, Rectangle] as const;
export const actionClasses = [ClearAll] as const;

export const canvasTools: ToolClasses = {
  brush: Brush,
  line: Line,
  rectangle: Rectangle,
  circle: Circle,
  eraser: Eraser
};

export const canvasActions: Pick<ActionClasses, 'clearAll'> = {
  clearAll: ClearAll
};
