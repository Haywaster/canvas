export class Tool {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.destroy();
  }
  
  destroy(): void {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}