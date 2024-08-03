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

const radiusCoef = 2;

export const LiveCursor: FC<IProps> = memo(props => {
  const { cords, diameter } = props;

  if (!cords) {
    return null;
  }

  return (
    <div
      className={module.liveCursor}
      style={{
        left: cords.x - diameter / radiusCoef,
        top: cords.y - diameter / radiusCoef,
        width: diameter,
        height: diameter
      }}
    />
  );
});
