import type { IConnection } from 'features/Connection';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { canvasTools, drawHandler, usePainting } from 'features/Painting';
import { API_URL } from 'shared/const';

interface IUseWebSocket {
  socket: WebSocket | null;
  sessionId: string | null;
}

export const useWebSocket = (): IUseWebSocket => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<IConnection | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { id } = useParams();

  const currentTool = usePainting(state => state.currentTool);
  const canvas = usePainting(state => state.canvas);
  const options = usePainting(state => state.options);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(id, API_URL);
    const socket = new WebSocket(API_URL);
    setSocket(socket);

    socket.onmessage = event => {
      const data = JSON.parse(event.data) as IConnection;
      setSocketData(data);
    };

    return () => {
      socket.close();
    };
  }, [setSocket, setSocketData]);

  useEffect(() => {
    if (id) {
      setSessionId(id);
    }
  }, [id, setSessionId]);

  useEffect(() => {
    if (socketData) {
      if (socketData.method === 'connection') {
        toast.info(`Пользователь ${socketData.username} подключился`);
      } else {
        drawHandler(socketData, canvas, currentTool);
      }
    }
  }, [canvas, currentTool, socketData]);

  useEffect(() => {
    if (canvas && socket && sessionId) {
      const ClassToCreate = canvasTools[currentTool];
      new ClassToCreate(canvas, socket, sessionId, options);
    }
  }, [options, currentTool, socket, sessionId, canvas]);

  return {
    socket,
    sessionId
  };
};
