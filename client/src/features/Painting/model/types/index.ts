import type { Brush, Circle, Eraser, Line, Rectangle } from '../scheme';
import type { PaintingOptions } from 'entities/Tool';

export interface ToolClasses {
  brush: new (canvas: HTMLCanvasElement, options: PaintingOptions) => Brush;
  line: new (canvas: HTMLCanvasElement, options: PaintingOptions) => Line;
  rectangle: new (
    canvas: HTMLCanvasElement,
    options: PaintingOptions
  ) => Rectangle;
  circle: new (canvas: HTMLCanvasElement, options: PaintingOptions) => Circle;
  eraser: new (canvas: HTMLCanvasElement, options: PaintingOptions) => Eraser;
}
