import WebSocket from "ws";
import Room, { IRoom } from "./room";
import { uuidv4 } from "../lib/utils";

export type SocketUser = WebSocket & { id: string };

export default class Chat {
  private rooms: IRoom[];
  private users: SocketUser[];

  constructor() {
    this.rooms = [];
    this.users = [];
  }

  add(user: WebSocket) {
    let incomingUser = user as SocketUser;
    incomingUser.id = uuidv4();
    this.users.push(incomingUser);

    user.on("message", (msg) => {
      const message = typeof msg === "object" ? msg.toString() : msg;
      const [command, ...rest] = message.split(" ");

      if (command === "join") {
        this.join(user, rest[0]);
      } else if (command === "msg") {
        this.msg(user, rest[0], rest.slice(1).join(" "));
      } else if (command === "leave") {
        this.leave(user, rest[0]);
      }

      console.log(
        `message received from user id \"${incomingUser.id}\": ${message}`
      );
    });

    user.on("close", () => {
      this.users.splice(this.users.indexOf(incomingUser), 1);
      this.rooms.forEach((room) => {
        room.remove(user);
      });
    });

    user.on("error", (err) => {
      console.log(err);
    });
  }

  private join(user: WebSocket, roomName: string) {
    let room = this.findRoom(roomName);

    if (!room) {
      room = new Room(roomName);
      this.rooms.push(room);
    }

    room.add(user);
    user.send(`joined ${roomName} ${room.id}`, { binary: false });
  }

  private msg(user: WebSocket, roomId: string | undefined, message: string) {
    if (roomId === undefined || message.length === 0) {
      user.send("Invalid command | message");
      return;
    }

    let room = this.findRoomById(roomId);
    if (!room) {
      user.send("Room not found");
      return;
    }

    room.push(user, message);
  }

  private leave(user: WebSocket, roomId: string | undefined) {
    if (roomId === undefined) {
      user.send("I dont understand you bitch");
      return;
    }

    let room = this.findRoomById(roomId);
    if (!room) {
      user.send("no room to leave biatch");
      return;
    }

    room.remove(user);
    console.log(
      `leaving: user \"${(user as SocketUser).id}\" has left room id \"${
        room.id
      }\"`
    );
  }

  private findRoomById(roomId: string): IRoom | undefined {
    return this.rooms.find((room) => room.id === roomId);
  }

  private findRoom(roomName: string): IRoom | undefined {
    return this.rooms.find((room) => room.name === roomName);
  }
}
