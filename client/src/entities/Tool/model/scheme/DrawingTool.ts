import type { PaintingOptions } from 'entities/Tool';
import { Tool } from 'entities/Tool';

export abstract class DrawingTool extends Tool {
  protected down: boolean | undefined;

  constructor(
    canvas: HTMLCanvasElement,
    socket: WebSocket,
    sessionId: string,
    options: PaintingOptions
  ) {
    super(canvas, socket, sessionId, options);
    this.listen();
  }

  protected listen(): void {
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

      this.socket.send(
        JSON.stringify({
          id: this.sessionId,
          method: 'draw',
          figure: {
            name: 'finish'
          }
        })
      );
    };

    this.canvas.onmouseleave = (): void => {
      this.down = false;

      this.socket.send(
        JSON.stringify({
          id: this.sessionId,
          method: 'draw',
          figure: {
            name: 'finish'
          }
        })
      );
    };
  }

  protected abstract startDrawing(x: number, y: number): void;
}
