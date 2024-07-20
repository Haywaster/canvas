import { Brush } from '../Brush';

export class Eraser extends Brush {
  draw(x: number, y: number): void {
    super.draw(x, y);

    if (this.context) {
      this.context.strokeStyle = 'white';
    }
  }
}
