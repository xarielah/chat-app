import { useState } from "react";
import { socket } from "../App";

const Entrance = () => {
  const [roomName, setRoomName] = useState<string>("");

  const setName = () => {
    socket.send(`join ${roomName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value.trim())}
        placeholder="Room Name"
        type="text"
      />
      <button type="submit" onClick={setName}>
        Enter
      </button>
    </div>
  );
};

export default Entrance;
