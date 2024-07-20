import type { paintingTools, tools, inputTools } from '../const';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

export type Tools = (typeof tools)[number];
export type PaintingTools = (typeof paintingTools)[number];
export type InputTools = (typeof inputTools)[number];

export interface InputTool extends InputHTMLAttributes<HTMLInputElement> {
  id: InputTools;
  label: string;
  type: HTMLInputTypeAttribute;
}
