import { Tool } from 'entities/Tool';

export class Rectangle extends Tool {
  private down = false;
  private saved: string;
  private startX = 0;
  private startY = 0;
  private img = new Image();
  
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }
  
  listen(): void {
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
        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;
        requestAnimationFrame(() => this.draw(x, y));
      }
    };
  }
  
  draw(x: number, y: number): void {
    const width = x - this.startX;
    const height = y - this.startY;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.rect(this.startX, this.startY, width, height);
    this.context.fill();
    this.context.stroke();
  }
}
