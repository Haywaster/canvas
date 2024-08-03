import type { PaintingOptions } from 'entities/Tool';
import { Canvas } from './Canvas.ts';

export abstract class Tool extends Canvas {
  protected strokeColor: string;
  protected strokeWidth: number;
  protected fillColor: string;

  protected constructor(canvas: HTMLCanvasElement, options: PaintingOptions) {
    super(canvas);
    this.strokeColor = options.strokeColor;
    this.strokeWidth = options.strokeWidth;
    this.fillColor = options.fillColor;
    this.destroy();
  }

  private destroy(): void {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
