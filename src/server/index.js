import express from "express";
import { Server as WebSocketServer} from "socket.io";
import { createServer } from "node:http";
import { WebSocket } from "./websocket.js";
import { FileSystem } from "./fileSystem.js";
import { Server as InstServer } from "./server.js";

const app = express();
const server = createServer(app);
const config =  { maxHttpBufferSize: 10 * 1024 * 1024 };
const io = new WebSocketServer(server, config);
const database = new FileSystem();

const websocket = new WebSocket(database, io);
const serverInst = new InstServer(app, server, websocket);

serverInst.communicationStart();

serverInst.listen(3000);