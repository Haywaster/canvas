import { Tool } from 'entities/Tool';

export class Brush extends Tool {
  private down: boolean;
  
  constructor(canvas) {
    super(canvas);
    this.listen();
  }
  
  listen(): void {
    this.canvas.onmousedown = (event: MouseEvent): void => {
      this.down = true;
      this.context.beginPath();
      const x = event.clientX - this.canvas.offsetLeft;
      const y = event.clientY - this.canvas.offsetTop;
      this.context.moveTo(x, y);
    };
    
    this.canvas.onmouseup = (): void => {
      this.down = false;
    };
    
    this.canvas.onmousemove = (event: MouseEvent): void => {
      if (this.down) {
        const x = event.pageX - this.canvas.offsetLeft;
        const y = event.pageY - this.canvas.offsetTop;
        this.draw(x, y);
      }
    };
  }
  
  draw(x: number, y: number): void {
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}