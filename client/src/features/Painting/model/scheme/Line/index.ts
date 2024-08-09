import { DrawingTool } from 'entities/Tool';
import type { ICanvasExtendedConfig, IConnection } from 'features/Connection';

export class Line extends DrawingTool {
  private startX: number = 0;
  private startY: number = 0;
  private saved: string | undefined;

  startDrawing(x: number, y: number): void {
    this.startX = x;
    this.startY = y;
    this.context?.moveTo(x, y);
    this.saved = this.canvas.toDataURL();
  }

  listen() {
    super.listen();

    this.canvas.onmousemove = (event: MouseEvent): void => {
      if (this.down) {
        const x = event.pageX - this.canvas.offsetLeft;
        const y = event.pageY - this.canvas.offsetTop;

        const data: IConnection = {
          id: this.sessionId,
          method: 'draw',
          figure: {
            name: 'line',
            x,
            y,
            options: {
              strokeColor: this.strokeColor,
              strokeWidth: this.strokeWidth,
              fillColor: this.fillColor
            },
            startX: this.startX,
            startY: this.startY,
            saved: this.saved || ''
          }
        };

        this.socket.send(JSON.stringify(data));
      }
    };
  }

  static draw(
    context: CanvasRenderingContext2D | null,
    config: ICanvasExtendedConfig
  ): void {
    const { x, y, options, startX, startY, saved } = config;
    const img = new Image();

    if (saved) {
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
          context.moveTo(startX, startY);
          context.lineTo(x, y);
          context.stroke();
          context.strokeStyle = options.strokeColor;
          context.lineWidth = options.strokeWidth;
        }
      };
    }
  }
}
