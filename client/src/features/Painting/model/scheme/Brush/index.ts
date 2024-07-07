import { Tool } from 'entities/Tool';

export class Brush extends Tool {
  private down: boolean;
  
  constructor(canvas) {
    super(canvas);
    this.listen();
  }
  
  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }
  
  mouseUpHandler(): void {
    this.down = false;
  }
  
  mouseDownHandler(event): void {
    this.down = true;
    this.context.beginPath();
    const x = event.clientX - this.canvas.offsetLeft;
    const y = event.clientY - this.canvas.offsetTop;
    this.context.moveTo(x, y);
  }
  
  mouseMoveHandler(event): void {
    if (this.down) {
      const x = event.pageX - this.canvas.offsetLeft;
      const y = event.pageY - this.canvas.offsetTop;
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }
}