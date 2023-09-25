export type User = {
  name: string | null;
};

export type AppContext = {
  user: User;
  room: Room;
};

export type Room = { name: string | null; id: string | null };

export type Message = {
  message: string;
  sender: string;
  isMe: boolean;
};
