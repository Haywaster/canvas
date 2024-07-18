import type { PaintingTools, Tools } from '../model';
import { paintingTools } from '../model';

export const isPaintingTool = (tool: Tools): tool is PaintingTools =>
  paintingTools.includes(tool);
