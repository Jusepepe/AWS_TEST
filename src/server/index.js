import express from "express";
import { Server as WebSocketServer} from "socket.io";
import { createServer } from "node:http";
import { WebSocket } from "./protocol/websocket.js";
import { FileSystem } from "./database/fileSystem.js";
import { Server as HttpServer } from "./httpserver/server.js";

const app = express();
const server = createServer(app);
const config =  { maxHttpBufferSize: 10 * 1024 * 1024 };
const io = new WebSocketServer(server, config);
const database = new FileSystem();

const websocket = new WebSocket(database, io);
const httpServer = new HttpServer(app, server);

websocket.start();

httpServer.listen(3000);