export abstract class Canvas {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D | null;

  protected constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }
}
