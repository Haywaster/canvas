import { type FC, memo, ReactElement } from 'react';
import module from './Header.module.scss';
import { Brush, Circle, Eraser, Rectangle, Redo, Save, Undo } from 'shared/assets/icons';
import { Button } from 'shared/ui/Button';
import { PaintingTools, Tools } from 'entities/Tool';
import { usePainting } from 'features/Painting/model/store/usePainting.ts';

const tools: Record<Tools, ReactElement> = {
  brush: <Brush/>,
  rectangle: <Rectangle/>,
  circle: <Circle/>,
  eraser: <Eraser/>,
  undo: <Undo/>,
  redo: <Redo/>,
  save: <Save/>,
};

const isPaintingTool = (tool: Tools): tool is PaintingTools => {
  return ['brush', 'rectangle', 'circle', 'eraser'].includes(tool);
};

export const Header: FC = memo(() => {
  const { currentTool, setCurrentTool } = usePainting();
  
  const currentToolHandler = (tool: Tools): void => {
    if (isPaintingTool(tool)) {
      setCurrentTool(tool);
    }
  };
  
  return (
    <header className={ module.Header }>
      <div className={ module.Panel }>
        { Object.entries(tools).map(([key, icon]: [Tools, ReactElement]) => (
          <Button
            key={ key }
            icon
            isActive={key === currentTool}
            className={ module[key] }
            onClick={ () => currentToolHandler(key) }>
            { icon }
          </Button>
        )) }
      </div>
      <div className={ module.Panel }>
        <input type='color'/>
      </div>
    </header>
  );
});