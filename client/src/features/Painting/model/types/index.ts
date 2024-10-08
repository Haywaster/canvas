import type { PaintingTools } from 'entities/Tool';
import type { toolsClasses } from '../const';

export type ToolClasses = Record<PaintingTools, (typeof toolsClasses)[number]>;
