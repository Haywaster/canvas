import type { IUser } from 'entities/User';
import type { PaintingOptions, PaintingTools } from 'entities/Tool';

export interface ICanvasConfig {
  name: Exclude<PaintingTools, 'eraser'>;
  x: number;
  y: number;
  options: PaintingOptions;
  startX?: number;
  startY?: number;
  saved?: string;
}

export interface IConnection extends IUser {
  method: 'connection' | 'draw';
  figure: ICanvasConfig;
}
