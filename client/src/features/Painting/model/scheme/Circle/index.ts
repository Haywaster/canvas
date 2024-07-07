import { Shape } from 'entities/Tool';

export class Circle extends Shape {
  draw(x: number, y: number): void {
    const radius = Math.sqrt((x - this.startX) ** 2 + (y - this.startY) ** 2);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
  }
}