import { Message } from "../../lib/types";

const MessageFeed = ({ messages }: IMessageFeed) => {
  return (
    <article className="w-full bg-zinc-700 rounded-lg p-5 flex flex-col gap-3 overflow-hidden">
      {messages.length === 0 ? (
        <span className="bg-green-300/10 px-4 py-1 rounded-lg">
          no messages
        </span>
      ) : (
        <>
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span
                className={`text-[.8em] bg-zinc-600/30 w-max px-2 py-1 rounded-xl text-gray-400 ${
                  message.isMe ? "self-end" : ""
                }`}
              >
                {message.sender} {message.isMe ? "" : "says:"}
              </span>
              <p
                className={`${
                  message.isMe
                    ? "bg-green-400/10"
                    : "bg-blue-400/10 text-blue-400"
                } rounded-xl px-4 max-w-full text-sm py-2 w-max break-words ${
                  message.isMe ? "self-end" : ""
                }`}
              >
                {message.message}
              </p>
            </div>
          ))}
        </>
      )}
    </article>
  );
};

interface IMessageFeed {
  messages: Message[];
}

export default MessageFeed;
