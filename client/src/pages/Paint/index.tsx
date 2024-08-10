import { type FC, useState } from 'react';
import { Canvas } from 'widgets/Canvas/ui/Canvas';
import { Header } from 'widgets/Header/ui/Header';
import type { IConnection } from 'features/Connection';
import { UsernameModal } from 'features/Connection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWebSocket } from 'features/Connection';

export const Paint: FC = () => {
  const [username, setUsername] = useState<string>('');

  const { socket, sessionId } = useWebSocket();

  const onComeIn = (value: string): void => {
    if (value && socket && sessionId) {
      setUsername(value);

      const userData: IConnection = {
        id: sessionId,
        username: value,
        method: 'connection'
      };
      socket.send(JSON.stringify(userData));
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
