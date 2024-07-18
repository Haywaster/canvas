import { Tool } from './Tool';

export abstract class Shape extends Tool {
  protected down: boolean = false;
  protected saved: string | undefined;
  protected startX = 0;
  protected startY = 0;
  protected img = new Image();

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  private listen(): void {
    this.canvas.onmousedown = (event: MouseEvent): void => {
      this.down = true;
      this.startX = event.clientX - this.canvas.offsetLeft;
      this.startY = event.clientY - this.canvas.offsetTop;
      this.saved = this.canvas.toDataURL();
      this.img.src = this.saved;
    };

    this.canvas.onmouseup = (): void => {
      this.down = false;
    };

    this.canvas.onmousemove = (event: MouseEvent): void => {
      if (this.down) {
        const currentX = event.clientX - this.canvas.offsetLeft;
        const currentY = event.clientY - this.canvas.offsetTop;
        this.draw(currentX, currentY);
      }
    };
  }

  protected abstract draw(x: number, y: number): void;
}
