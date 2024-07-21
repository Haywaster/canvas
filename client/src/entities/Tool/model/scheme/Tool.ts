import type { PaintingOptions } from 'entities/Tool';

export abstract class Tool {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D | null;
  protected strokeColor: string;
  protected strokeWidth: number;
  protected fillColor: string;

  protected constructor(canvas: HTMLCanvasElement, options: PaintingOptions) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.strokeColor = options.strokeColor;
    this.strokeWidth = options.strokeWidth;
    this.fillColor = options.fillColor;
    console.log(options);
    this.destroy();
  }

  destroy(): void {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
