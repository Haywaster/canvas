import { type FC, memo } from 'react';
import { Canvas } from 'widgets/Canvas';
import { Header } from 'widgets/Header';

export const Main: FC = memo(() => {
  return (
    <>
      <Header />
      <Canvas />
    </>
  );
});
