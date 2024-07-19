import type { Tools } from 'entities/Tool';
import { isPaintingTool } from 'entities/Tool';
import { usePainting } from 'features/Painting';
import type { MouseEventHandler, ReactElement, FC } from 'react';
import { memo, useCallback } from 'react';
import {
  Brush,
  Circle,
  Eraser,
  Line,
  Rectangle,
  Redo,
  Save,
  Undo
} from 'shared/assets/icons';
import { Button } from 'shared/ui/Button';

import module from './Header.module.scss';
import { ucFirst } from 'shared/lib/ucFirst.ts';

const headerTools: Record<Tools, ReactElement> = {
  brush: <Brush />,
  line: <Line />,
  rectangle: <Rectangle />,
  circle: <Circle />,
  eraser: <Eraser />,
  undo: <Undo />,
  redo: <Redo />,
  save: <Save />
};

export const Header: FC = memo(() => {
  const currentTool = usePainting(state => state.currentTool);
  const setCurrentTool = usePainting(state => state.setCurrentTool);

  const handleToolChange: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      const tool = event.currentTarget.dataset.key as Tools;

      if (isPaintingTool(tool)) {
        setCurrentTool(tool);
      }
    },
    [setCurrentTool]
  );

  return (
    <header className={module.header}>
      <div className={module.panel}>
        {Object.entries(headerTools).map(([key, icon]) => (
          <Button
            data-key={key}
            key={key}
            icon
            isActive={key === currentTool}
            className={ucFirst(module[key])}
            onClick={handleToolChange}
          >
            {icon}
          </Button>
        ))}
      </div>
      <div className={module.panel}>
        <input type='color' />
      </div>
    </header>
  );
});
