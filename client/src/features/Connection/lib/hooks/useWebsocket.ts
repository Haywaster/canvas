import type { IConnection, IDrawConnection } from 'features/Connection';
import { useConnection } from 'features/Connection';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useWebSocket = (
  id: string | undefined,
  username: string,
  drawHandler: (data: IDrawConnection) => void
) => {
  const setSocket = useConnection(state => state.setSocket);
  const setSessionId = useConnection(state => state.setSessionId);

  useEffect(() => {
    if (username && id) {
      const socket = new WebSocket('ws://localhost:5000');
      setSocket(socket);
      setSessionId(id);

      socket.onopen = () => {
        socket.send(JSON.stringify({ id, username, method: 'connection' }));
      };

      socket.onmessage = event => {
        const data = JSON.parse(event.data) as IConnection;

        if (data.method === 'connection' && data.username === username) {
          toast.info(`Пользователь ${data.username} подключился`);
        } else if (data.method === 'draw') {
          drawHandler(data);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [id, setSessionId, setSocket, username]);
};
