import { useCallback } from 'react';
import { type FC, useState } from 'react';
import { Canvas } from 'widgets/Canvas/ui/Canvas';
import { Header } from 'widgets/Header/ui/Header';
import { useParams } from 'react-router-dom';
import { UsernameModal } from 'features/Connection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { IConnection } from 'features/Connection';
import { drawHandler, usePainting } from 'features/Painting';
import { useWebSocket } from 'features/Connection';

export const Paint: FC = () => {
  const { id } = useParams();
  const [username, setUsername] = useState<string>('');

  const canvas = usePainting(state => state.canvas);
  const currentTool = usePainting(state => state.currentTool);

  const draw = useCallback(
    (data: IConnection) => drawHandler(data, canvas, currentTool),
    [canvas, currentTool]
  );
  useWebSocket(id, username, draw);

  const onComeIn = (value: string): void => {
    if (value) {
      setUsername(value);
    }
  };

  return (
    <>
      <Header />
      <Canvas />
      <UsernameModal isOpen={!username} onComeIn={onComeIn} />
      <ToastContainer position='top-right' autoClose={5000} />
    </>
  );
};
