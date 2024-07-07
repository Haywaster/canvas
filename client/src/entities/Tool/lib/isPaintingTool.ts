import { paintingTools, PaintingTools, Tools } from '../model';

export const isPaintingTool = (tool: Tools): tool is PaintingTools => paintingTools.includes(tool);