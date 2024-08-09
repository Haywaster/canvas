import type { PaintingOptions, PaintingTools } from 'entities/Tool';

export interface ICanvasBaseConfig {
  name: Extract<PaintingTools, 'brush'>;
  x: number;
  y: number;
  options: PaintingOptions;
}

export interface ICanvasExtendedConfig extends Omit<ICanvasBaseConfig, 'name'> {
  name: Extract<PaintingTools, 'rectangle' | 'circle' | 'line'>;
  startX: number;
  startY: number;
  saved: string;
}

export interface ICanvasFinishConfig {
  name: 'finish';
}

export interface IDrawConnection {
  id: string;
  method: 'draw';
  figure: ICanvasBaseConfig | ICanvasExtendedConfig | ICanvasFinishConfig;
}

interface IConnectionMethod {
  id: string;
  method: 'connection';
  username: string;
}

export type IConnection = IDrawConnection | IConnectionMethod;
