import { type FC, memo } from 'react';
import module from './Canvas.module.scss';

interface IProps {

}

export const Canvas: FC<IProps> = memo(() => {
  return (
    <div className={ module.Canvas }>
      Hello
    </div>
  );
});