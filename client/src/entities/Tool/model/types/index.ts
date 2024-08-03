import type { paintingTools, actionTools } from '../const';
import type { InputHTMLAttributes } from 'react';

export type ActionTools = (typeof actionTools)[number];
export type PaintingTools = (typeof paintingTools)[number];
export type Tools = ActionTools | PaintingTools;

export interface PaintingOptions {
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
}

export interface InputTool extends InputHTMLAttributes<HTMLInputElement> {
  id: keyof PaintingOptions;
  label: string;
}
