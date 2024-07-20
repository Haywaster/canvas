import { DrawingTool } from 'entities/Tool';

export class Brush extends DrawingTool {
  startDrawing(x: number, y: number): void {
    this.context?.moveTo(x, y);
  }

  draw(x: number, y: number): void {
    if (this.context) {
      this.context.lineTo(x, y);
      this.context.stroke();
      this.context.strokeStyle = this.strokeColor;
    }
  }
}
