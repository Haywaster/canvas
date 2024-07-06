import { type FC, memo } from 'react';

import { Header } from 'widgets/Header/Header.tsx';
import { Canvas } from 'widgets/Canvas/Canvas.tsx';

export const Main: FC = memo(() => {
  return (
    <>
      <Header/>
      <Canvas/>
    </>
  );
});