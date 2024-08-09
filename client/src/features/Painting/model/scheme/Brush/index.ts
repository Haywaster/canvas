import { DrawingTool } from 'entities/Tool';
import type { ICanvasBaseConfig, IConnection } from 'features/Connection';

export class Brush extends DrawingTool {
  protected startDrawing(x: number, y: number): void {
    this.context?.moveTo(x, y);
  }

  protected listen() {
    super.listen();

    this.canvas.onmousemove = (event: MouseEvent): void => {
      if (this.down) {
        const x = event.pageX - this.canvas.offsetLeft;
        const y = event.pageY - this.canvas.offsetTop;

        const data: IConnection = {
          id: this.sessionId,
          method: 'draw',
          figure: {
            name: 'brush',
            x,
            y,
            options: {
              strokeColor: this.strokeColor,
              strokeWidth: this.strokeWidth,
              fillColor: this.fillColor
            }
          }
        };

        this.socket.send(JSON.stringify(data));
      }
    };
  }

  static draw(
    context: CanvasRenderingContext2D | null,
    config: ICanvasBaseConfig
  ): void {
    const { x, y, options } = config;

    if (context) {
      context.lineTo(x, y);
      context.stroke();
      context.strokeStyle = options.strokeColor;
      context.lineWidth = options.strokeWidth;
    }
  }
}
