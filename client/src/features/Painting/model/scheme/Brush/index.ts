import { DrawingTool, type PaintingOptions } from 'entities/Tool';

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

        this.socket.send(
          JSON.stringify({
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
          })
        );
      }
    };
  }

  static draw(
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    options: PaintingOptions
  ): void {
    if (context) {
      context.lineTo(x, y);
      context.stroke();
      context.strokeStyle = options.strokeColor;
      context.lineWidth = options.strokeWidth;
    }
  }
}
