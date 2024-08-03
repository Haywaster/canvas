import type { InputTool, Tools } from 'entities/Tool';
import type { FC } from 'react';
import {
  Brush,
  Circle,
  ClearAll,
  Download,
  Eraser,
  Line,
  Rectangle,
  Redo,
  Save,
  Undo
} from '../../assets';

const headerTools: Record<Tools, FC> = {
  brush: Brush,
  line: Line,
  rectangle: Rectangle,
  circle: Circle,
  eraser: Eraser,
  undo: Undo,
  redo: Redo,
  clearAll: ClearAll,
  save: Save,
  download: Download
};

export const tools = Object.entries(headerTools) as [Tools, FC][];

export const paintingOptions: InputTool[] = [
  { id: 'strokeColor', label: 'Обводка', type: 'color' },
  { id: 'fillColor', label: 'Заливка', type: 'color' },
  {
    id: 'strokeWidth',
    label: 'Толщина',
    type: 'range',
    min: '1',
    max: '10'
  }
];
