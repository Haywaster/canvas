import { type FC } from 'react';
import { Welcome } from 'widgets/Welcome';
import video from './video.webm';
import module from './Main.module.scss';

export const Main: FC = () => {
  return (
    <>
      <video autoPlay muted loop src={video} className={module.bgVideo} />
      <Welcome />
    </>
  );
};
