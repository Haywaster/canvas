import type { FC } from 'react';
import { memo } from 'react';
import module from './LiveCursor.module.scss';

export interface IMouseCoords {
  x: number;
  y: number;
}

interface IProps {
  cords: IMouseCoords | null;
  diameter: number;
}

export const LiveCursor: FC<IProps> = memo(props => {
  const { cords, diameter = 16 } = props;

  if (!cords) {
    return null;
  }

  return (
    <div
      className={module.liveCursor}
      style={{
        left: cords.x - diameter / 2,
        top: cords.y - diameter / 2,
        width: diameter,
        height: diameter
      }}
    />
  );
});
