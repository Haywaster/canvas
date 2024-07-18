import { type FC, memo } from 'react';
import { Canvas } from 'widgets/Canvas/Canvas';
import { Header } from 'widgets/Header/Header';

export const Main: FC = memo(() => {
  return (
    <>
      <Header />
      <Canvas />
    </>
  );
});
