export class Canvas {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  clearAll() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  draw(url: string) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      if (this.context) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(image, 0, 0);
      }
    };
  }
}
