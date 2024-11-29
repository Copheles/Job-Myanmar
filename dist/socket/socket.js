import { Server } from "socket.io";
import http from "http";
import express from "express";
import { joinRoom, leaveRoom } from "../constants/socketConstants.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});
io.on("connection", (socket) => {
    console.log("newConnection", socket.id);
    socket.on(joinRoom, (data) => {
        socket.join(data.room);
    });
    socket.on(leaveRoom, (data) => {
        socket.leave(data.room);
    });
});
export { app, io, server };
