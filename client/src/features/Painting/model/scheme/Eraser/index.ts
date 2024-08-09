import { Brush } from '../Brush';
import type { ICanvasBaseConfig } from 'features/Connection';

export class Eraser extends Brush {
  static draw(
    context: CanvasRenderingContext2D | null,
    config: ICanvasBaseConfig
  ): void {
    const { x, y, options } = config;

    if (context) {
      context.lineTo(x, y);
      context.stroke();
      context.strokeStyle = 'white';
      context.lineWidth = options.strokeWidth;
    }
  }
}
