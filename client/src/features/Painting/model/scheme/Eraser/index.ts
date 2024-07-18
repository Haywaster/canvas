import { Brush } from '../Brush';

export class Eraser extends Brush {
  constructor(canvas) {
    super(canvas);
  }

  draw(x: number, y: number): void {
    super.draw(x, y);
    this.context.strokeStyle = 'white';
  }
}
