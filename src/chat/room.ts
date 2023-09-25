import WebSocket from "ws";
import { uuidv4 } from "../lib/utils";
import { SocketUser } from "./chat";

export interface IRoom {
  name: string;
  id: string;

  add(user: WebSocket): void;
  push(from: WebSocket, message: string): void;
  remove(user: WebSocket): void;
}

export default class Room {
  private users: WebSocket[];
  id: string;

  constructor(public name: string) {
    this.users = [];
    this.id = uuidv4();
  }

  add(user: WebSocket) {
    if (!this.users.includes(user)) {
      this.users.push(user);
    }
  }

  remove(user: WebSocket) {
    if (this.users.includes(user)) {
      this.users.splice(this.users.indexOf(user), 1);
    }
  }

  push(from: WebSocket, message: string) {
    for (const socket of this.users) {
      if (socket !== from) {
        socket.send(`msg ${(from as SocketUser).id} ${message}`);
      }
    }
  }
}
