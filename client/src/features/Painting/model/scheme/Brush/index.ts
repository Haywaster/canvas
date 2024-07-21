import { DrawingTool } from 'entities/Tool';

export class Brush extends DrawingTool {
  startDrawing(x: number, y: number): void {
    this.context?.moveTo(x, y);
  }
}
