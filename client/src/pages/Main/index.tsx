import { type FC, memo } from 'react';
import { Canvas } from 'widgets/Canvas/ui/Canvas';
import { Header } from 'widgets/Header/ui/Header';

export const Main: FC = memo(() => {
  return (
    <>
      <Header />
      <Canvas />
    </>
  );
});
