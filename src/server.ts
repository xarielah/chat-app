import WebServer from "ws";
import Chat from "./chat/chat";
const PORT = process.env.PORT ?? 6969;

const chat = new Chat();

const server = new WebServer.Server({ port: +PORT });

server.on("connection", function (socket) {
  chat.add(socket);
});

server.on("error", function (error) {
  console.log("error: %s", error);
});
