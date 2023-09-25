import { useContext, useState } from "react";
import MessageFeed from "../components/chat/message-feed";
import { AppStateContext } from "../components/providers/state.provider";
import { Message } from "../lib/types";
import { socket } from "../App";

const Room = () => {
  const { room, exitRoom } = useContext(AppStateContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  socket.onmessage = (msg) => {
    const [command, sender, message] = msg.data.split(" ");
    if (command === "msg") {
      setMessages((prev) => [
        ...prev,
        { sender: sender, message: message, isMe: false },
      ]);
    }
  };

  const sendMessage = () => {
    socket.send(`msg ${room.id} ${userInput}`);
    setMessages((prev) => [
      ...prev,
      { sender: "You", message: userInput, isMe: true },
    ]);
    setUserInput("");
  };

  return (
    <section className="flex w-full flex-col gap-3 min-h-[80vh]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-3">
          <div className="w-max text-sm bg-green-400/10 px-4 py-1 rounded-lg">
            Room Name: {room.name}
          </div>
          <div className="w-max text-sm bg-green-400/10 px-4 py-1 rounded-lg">
            Room ID: {room.id}
          </div>
        </div>
        <button
          className="text-red-400 bg-red-400/10 text-sm"
          onClick={exitRoom}
        >
          Leave Room
        </button>
      </div>
      <div className="flex w-full flex-grow">
        <MessageFeed messages={messages} />
      </div>
      <div className="w-full flex items-center gap-6">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.trim())}
          className="w-full rounded-lg p-3"
          placeholder="Type your message here..."
          type="text"
        />
        <button className="h-full" type="submit" onClick={sendMessage}>
          Send
        </button>
      </div>
    </section>
  );
};

export default Room;
