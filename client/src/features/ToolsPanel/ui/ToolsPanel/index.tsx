import type { MouseEventHandler, ReactElement } from 'react';
import { type FC, memo, useCallback } from 'react';
import module from './ToolsPanel.module.scss';
import { Button } from 'shared/ui/Button';
import type { Tools } from 'entities/Tool';
import { isPaintingTool } from 'entities/Tool';
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
import { usePainting } from 'features/Painting';
import { useShallow } from 'zustand/react/shallow';

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

const tools = Object.entries(headerTools) as [Tools, ReactElement][];

export const ToolsPanel: FC = memo(() => {
  const { currentTool, setCurrentTool } = usePainting(
    useShallow(({ currentTool, setCurrentTool }) => ({
      currentTool,
      setCurrentTool
    }))
  );

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
    <div className={module.panel}>
      {tools.map(([key, icon]) => (
        <Button
          data-key={key}
          key={key}
          icon
          isActive={key === currentTool}
          className={module[key]}
          onClick={handleToolChange}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
});
