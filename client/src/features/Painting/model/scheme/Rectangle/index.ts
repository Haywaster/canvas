import { Shape } from 'entities/Tool';

export class Rectangle extends Shape {
  draw(x: number, y: number): void {
    const width = x - this.startX;
    const height = y - this.startY;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      this.img,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.context.beginPath();
    this.context.rect(this.startX, this.startY, width, height);
    this.context.fill();
    this.context.stroke();
  }
}
