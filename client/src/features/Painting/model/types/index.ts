import type { ActionTools, PaintingTools } from 'entities/Tool';
import type { toolsClasses } from '../const';

export type ToolClasses = Record<PaintingTools, (typeof toolsClasses)[number]>;
export type ActionClasses = Record<ActionTools, () => void>;
