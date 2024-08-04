import { type FC } from 'react';
import { Canvas } from 'widgets/Canvas/ui/Canvas';
import { Header } from 'widgets/Header/ui/Header';

export const Paint: FC = () => {
  return (
    <>
      <Header />
      <Canvas />
    </>
  );
};
