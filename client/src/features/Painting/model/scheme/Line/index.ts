import { DrawingTool } from 'entities/Tool';

export class Line extends DrawingTool {
  private startX: number = 0;
  private startY: number = 0;
  private saved: string | undefined;

  startDrawing(x: number, y: number): void {
    this.startX = x;
    this.startY = y;
    this.context?.moveTo(this.startX, this.startY);
    this.saved = this.canvas.toDataURL();
  }

  draw(x: number, y: number): void {
    const img = new Image();

    if (this.saved) {
      img.src = this.saved;
      img.onload = (): void => {
        if (this.context) {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.context.drawImage(
            img,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
          this.context.beginPath();
          this.context.moveTo(this.startX, this.startY);
          this.context.lineTo(x, y);
          this.context.stroke();
          this.context.strokeStyle = this.strokeColor;
          this.context.lineWidth = this.strokeWidth;
        }
      };
    }
  }
}
