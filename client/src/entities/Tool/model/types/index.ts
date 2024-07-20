import type { paintingTools, tools } from '../const';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

export type Tools = (typeof tools)[number];
export type PaintingTools = (typeof paintingTools)[number];

export interface PaintingOptions {
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
}

export interface InputTool extends InputHTMLAttributes<HTMLInputElement> {
  id: keyof PaintingOptions;
  label: string;
  type: HTMLInputTypeAttribute;
}
