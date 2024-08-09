import { Tool } from './Tool';
import type { PaintingTools } from 'entities/Tool';

export class Shape extends Tool {
  protected down: boolean = false;
  protected saved: string | undefined;
  protected startX = 0;
  protected startY = 0;

  protected listen(tool: Extract<PaintingTools, 'rectangle' | 'circle'>): void {
    this.canvas.onmousedown = (event: MouseEvent): void => {
      this.down = true;
      this.startX = event.clientX - this.canvas.offsetLeft;
      this.startY = event.clientY - this.canvas.offsetTop;
      this.saved = this.canvas.toDataURL();
    };

    this.canvas.onmouseup = (): void => {
      this.down = false;
    };

    this.canvas.onmousemove = (event: MouseEvent): void => {
      if (this.down) {
        const x = event.pageX - this.canvas.offsetLeft;
        const y = event.pageY - this.canvas.offsetTop;

        this.socket.send(
          JSON.stringify({
            id: this.sessionId,
            method: 'draw',
            figure: {
              name: tool,
              x,
              y,
              options: {
                strokeColor: this.strokeColor,
                strokeWidth: this.strokeWidth,
                fillColor: this.fillColor
              },
              startX: this.startX,
              startY: this.startY,
              saved: this.saved
            }
          })
        );
      }
    };
  }
}
