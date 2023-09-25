import { useContext, useState } from "react";
import Entrance from "./entrance";
import { socket } from "../App";
import Chat from "./chat";
import { AppStateContext } from "../components/providers/state.provider";

const AppWrapper = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { room, joinRoom } = useContext(AppStateContext);

  socket.onopen = () => {
    console.log("Connected to chat server");
    setLoading(false);
  };

  socket.onmessage = (msg) => {
    const [command, roomName, id] = msg.data.split(" ");
    if (command === "joined") {
      joinRoom!(roomName, id);
    }
  };

  if (loading) return <div>Connecting to server...</div>;
  return <>{!room.name ? <Entrance /> : <Chat />}</>;
};

export default AppWrapper;
