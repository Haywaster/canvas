import type { PaintingOptions } from 'entities/Tool';
import { Shape } from 'entities/Tool';

export class Rectangle extends Shape {
  constructor(
    canvas: HTMLCanvasElement,
    socket: WebSocket,
    sessionId: string,
    options: PaintingOptions
  ) {
    super(canvas, socket, sessionId, options);
    this.listen('rectangle');
  }
  // eslint-disable-next-line max-params
  static draw(
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    options: PaintingOptions,
    startX: number,
    startY: number,
    saved: string
  ): void {
    const rectWidth = x - startX;
    const rectHeight = y - startY;

    const image = new Image();
    image.src = saved;
    image.onload = (): void => {
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(
          image,
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
        context.beginPath();
        context.rect(startX, startY, rectWidth, rectHeight);
        context.strokeStyle = options.strokeColor;
        context.fillStyle = options.fillColor;
        context.lineWidth = options.strokeWidth;
        context.fill();
        context.stroke();
      }
    };
  }
}
