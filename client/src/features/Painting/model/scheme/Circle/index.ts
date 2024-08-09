import type { PaintingOptions } from 'entities/Tool';
import { Shape } from 'entities/Tool';
import type { ICanvasExtendedConfig } from 'features/Connection';

const square = 2;

export class Circle extends Shape {
  constructor(
    canvas: HTMLCanvasElement,
    socket: WebSocket,
    sessionId: string,
    options: PaintingOptions
  ) {
    super(canvas, socket, sessionId, options);
    this.listen('circle');
  }

  static draw(
    context: CanvasRenderingContext2D | null,
    config: ICanvasExtendedConfig
  ): void {
    const { x, y, options, startX, startY, saved } = config;
    const radius = Math.sqrt((x - startX) ** square + (y - startY) ** square);

    const img = new Image();
    img.src = saved;
    img.onload = (): void => {
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(
          img,
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
        context.beginPath();
        context.arc(startX, startY, radius, 0, Math.PI * square);
        context.strokeStyle = options.strokeColor;
        context.fillStyle = options.fillColor;
        context.lineWidth = options.strokeWidth;
        context.fill();
        context.stroke();
      }
    };
  }
}
