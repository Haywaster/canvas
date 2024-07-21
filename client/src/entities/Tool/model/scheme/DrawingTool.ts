import type { PaintingOptions } from 'entities/Tool';
import { Tool } from 'entities/Tool';

export abstract class DrawingTool extends Tool {
  private down: boolean | undefined;

  constructor(canvas: HTMLCanvasElement, options: PaintingOptions) {
    super(canvas, options);
    this.listen();
  }

  private listen(): void {
    if (this.context) {
      this.context.strokeStyle = this.strokeColor;
      this.context.lineWidth = this.strokeWidth;
    }

    this.canvas.onmousedown = (event: MouseEvent): void => {
      this.down = true;
      this.context?.beginPath();
      const x = event.clientX - this.canvas.offsetLeft;
      const y = event.clientY - this.canvas.offsetTop;
      this.startDrawing(x, y);
    };

    this.canvas.onmouseup = (): void => {
      this.down = false;
    };

    this.canvas.onmousemove = (event: MouseEvent): void => {
      if (this.down) {
        const x = event.pageX - this.canvas.offsetLeft;
        const y = event.pageY - this.canvas.offsetTop;
        this.draw(x, y);
      }
    };
  }

  protected abstract startDrawing(x: number, y: number): void;

  protected draw(x: number, y: number): void {
    if (this.context) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }
}
