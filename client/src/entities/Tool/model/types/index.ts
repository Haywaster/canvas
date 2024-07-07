export type Tools = 'brush' | 'rectangle' | 'circle' | 'eraser' | 'undo' | 'redo' | 'save'
export type PaintingTools = Extract<Tools, 'brush' | 'rectangle' | 'circle' | 'eraser'>
