import type { IConnection } from 'features/Connection';
import { useConnection } from 'features/Connection';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useWebSocket = (
  id: string | undefined,
  username: string,
  drawHandler: (data: IConnection) => void
) => {
  const setSocket = useConnection(state => state.setSocket);
  const setSessionId = useConnection(state => state.setSessionId);

  useEffect(() => {
    if (id) {
      setSessionId(id);
    }

    if (username && id) {
      const socket = new WebSocket('ws://localhost:5000');
      setSocket(socket);

      socket.onopen = () => {
        socket.send(JSON.stringify({ id, username, method: 'connection' }));
      };

      socket.onmessage = event => {
        const data = JSON.parse(event.data) as IConnection;
        if (data.method === 'connection' && data.username !== username) {
          toast.info(`Пользователь ${data.username} подключился`);
        } else if (data.method === 'draw') {
          drawHandler(data);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [drawHandler, id, setSessionId, setSocket, username]);
};
