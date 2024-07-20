import type { InputTool, PaintingOptions, Tools } from 'entities/Tool';
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

const paintingOptions: InputTool[] = [
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

export const Header: FC = memo(() => {
  const { currentTool, setCurrentTool } = usePainting(
    useShallow(({ currentTool, setCurrentTool }) => ({
      currentTool,
      setCurrentTool
    }))
  );
  const { options, setOptions } = usePainting(
    useShallow(({ options, setOptions }) => ({ options, setOptions }))
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

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setOptions(id as keyof PaintingOptions, value);
  };

  return (
    <header className={module.header}>
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
      <div className={module.panel}>
        {paintingOptions.map(({ id, label, type, max, min }) => (
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              onChange={changeHandler}
              id={id}
              type={type}
              value={options[id]}
              max={max}
              min={min}
            />
          </div>
        ))}
      </div>
    </header>
  );
});
