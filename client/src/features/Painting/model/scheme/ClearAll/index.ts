import { Canvas } from 'entities/Tool/model/scheme/Canvas.ts';

export class ClearAll extends Canvas {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.clearAll();
  }

  clearAll() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
