import type { InputTool, InputTools, Tools } from 'entities/Tool';
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

const inputTools: InputTool[] = [
  { id: 'strokeColor', label: 'Обводка', type: 'color' },
  { id: 'fillColor', label: 'Заливка', type: 'color' },
  {
    id: 'strokeWidth',
    label: 'Толщина',
    type: 'range',
    max: '10',
    min: '1'
  }
];

export const Header: FC = memo(() => {
  const { currentTool, setCurrentTool } = usePainting(
    useShallow(({ currentTool, setCurrentTool }) => ({
      currentTool,
      setCurrentTool
    }))
  );
  const { fillColor, setFillColor } = usePainting(
    useShallow(({ fillColor, setFillColor }) => ({ fillColor, setFillColor }))
  );
  const { strokeColor, setStrokeColor } = usePainting(
    useShallow(({ strokeColor, setStrokeColor }) => ({
      strokeColor,
      setStrokeColor
    }))
  );
  const { strokeWidth, setStrokeWidth } = usePainting(
    useShallow(({ strokeWidth, setStrokeWidth }) => ({
      strokeWidth,
      setStrokeWidth
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

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;

    switch (id) {
      case 'strokeColor':
        setStrokeColor(value);
        break;
      case 'fillColor':
        setFillColor(value);
        break;
      case 'strokeWidth':
        setStrokeWidth(Number(value));
        break;
    }
  };

  const getInputValue = (id: InputTools): string => {
    switch (id) {
      case 'strokeColor':
        return strokeColor;
      case 'fillColor':
        return fillColor;
      case 'strokeWidth':
        return String(strokeWidth);
      default:
        return '';
    }
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
        {inputTools.map(({ id, label, type, max, min }) => (
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              onChange={changeHandler}
              id={id}
              type={type}
              value={getInputValue(id)}
              max={max}
              min={min}
            />
          </div>
        ))}
      </div>
    </header>
  );
});
