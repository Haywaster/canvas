import { type FC, memo, MouseEventHandler, ReactElement, useCallback } from 'react';
import module from './Header.module.scss';
import { Brush, Circle, Eraser, Line, Rectangle, Redo, Save, Undo } from 'shared/assets/icons';
import { Button } from 'shared/ui/Button';
import { isPaintingTool, Tools } from 'entities/Tool';
import { usePainting } from 'features/Painting';

const headerTools: Record<Tools, ReactElement> = {
  brush: <Brush/>,
  line: <Line/>,
  rectangle: <Rectangle/>,
  circle: <Circle/>,
  eraser: <Eraser/>,
  undo: <Undo/>,
  redo: <Redo/>,
  save: <Save/>,
};

export const Header: FC = memo(() => {
  const currentTool = usePainting(state => state.currentTool);
  const setCurrentTool = usePainting(state => state.setCurrentTool);
  
  const handleToolChange: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    const tool = event.currentTarget.dataset.key as Tools;
    
    if (isPaintingTool(tool)) {
      setCurrentTool(tool);
    }
  }, [setCurrentTool]);
  
  return (
    <header className={ module.Header }>
      <div className={ module.Panel }>
        { Object.entries(headerTools).map(([key, icon]: [Tools, ReactElement]) => (
          <Button
            data-key={ key }
            key={ key }
            icon
            isActive={ key === currentTool }
            className={ module[key] }
            onClick={ handleToolChange }>
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
