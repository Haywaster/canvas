import { create } from 'zustand';

interface State {
  socket: WebSocket | null;
  sessionId: string | null;
}

interface Actions {
  setSocket: (socket: WebSocket) => void;
  setSessionId: (sessionId: string) => void;
}

export const useConnection = create<State & Actions>()(set => ({
  socket: null,
  sessionId: null,
  setSocket: socket => set({ socket }),
  setSessionId: sessionId => set({ sessionId })
}));
