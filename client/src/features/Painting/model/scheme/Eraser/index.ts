import { Brush } from '../Brush';
import type { PaintingOptions } from 'entities/Tool';

export class Eraser extends Brush {
  static draw(
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    options: PaintingOptions
  ): void {
    if (context) {
      context.lineTo(x, y);
      context.stroke();
      context.strokeStyle = 'white';
      context.lineWidth = options.strokeWidth;
    }
  }
}
