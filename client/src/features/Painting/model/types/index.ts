import type { Brush, Circle, Eraser, Line, Rectangle } from '../scheme';

export interface ToolClasses {
  brush: new (canvas: HTMLCanvasElement) => Brush;
  line: new (canvas: HTMLCanvasElement) => Line;
  rectangle: new (canvas: HTMLCanvasElement) => Rectangle;
  circle: new (canvas: HTMLCanvasElement) => Circle;
  eraser: new (canvas: HTMLCanvasElement) => Eraser;
}
