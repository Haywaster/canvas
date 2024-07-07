import { DrawingTool } from 'entities/Tool';

export class Line extends DrawingTool {
  private startX: number;
  private startY: number;
  private saved: string;
  
  constructor(canvas) {
    super(canvas);
  }
  
  startDrawing(x: number, y: number) {
    this.startX = x
    this.startY = y
    this.context.moveTo(this.startX, this.startY)
    this.saved = this.canvas.toDataURL()
  }
  
  draw(x: number, y: number): void {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.context.beginPath()
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(x, y)
      this.context.stroke()
    }
  }
}
