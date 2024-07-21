import { Shape } from 'entities/Tool';

const square = 2;

export class Circle extends Shape {
  draw(x: number, y: number): void {
    const radius = Math.sqrt(
      (x - this.startX) ** square + (y - this.startY) ** square
    );

    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(
        this.img,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.context.beginPath();
      this.context.arc(this.startX, this.startY, radius, 0, Math.PI * square);
      this.context.strokeStyle = this.strokeColor;
      this.context.fillStyle = this.fillColor;
      this.context.lineWidth = this.strokeWidth;
      this.context.fill();
      this.context.stroke();
    }
  }
}
