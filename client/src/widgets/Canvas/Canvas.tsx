import { type FC, memo } from 'react';
import module from './Canvas.module.scss';

interface IProps {

}

export const Canvas: FC<IProps> = memo(() => {
  return (
    <main className={ module.Canvas }>
      Hello
    </main>
  );
});