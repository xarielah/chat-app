import { createContext, useState } from "react";
import type { AppContext, Room, User } from "../../lib/types";
import { socket } from "../../App";

export const AppStateContext = createContext<
  AppContext & Partial<HelperFunctions>
>({
  user: { name: null },
  room: { name: null, id: null },
});

const StateProvider = ({ children }: IStateProvider) => {
  const [user, setUser] = useState<User>({ name: null });
  const [room, setRoom] = useState<Room>({ name: null, id: null });

  const connect = (user: User) => {
    setUser(user);
  };

  const changeName = (name: string) => {
    setUser({ ...user, name });
  };

  const joinRoom = (name: string, id: string) => {
    setRoom({ name, id });
  };

  const exitRoom = () => {
    socket.send(`leave ${room.id}`);
    setRoom({ name: null, id: null });
  };

  return (
    <AppStateContext.Provider
      value={{
        user,
        room,
        connect,
        changeName,
        joinRoom,
        exitRoom,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

interface IStateProvider {
  children: React.ReactNode;
}

export type HelperFunctions = {
  mountSocket: (ws: WebSocket) => void;
  connect: (user: User) => void;
  changeName: (name: string) => void;
  joinRoom: (name: string, id: string) => void;
  exitRoom: () => void;
};

export default StateProvider;
