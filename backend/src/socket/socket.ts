import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://192.168.100.50:5173",
      "https://job-myanmar.onrender.com",
    ],
  },
});

io.on("connection", (socket) => {
  console.log("newConnection", socket.id);

  socket.on("join room", (data) => {
    socket.join(data.room);
  });

  socket.on("leave room", (data) => {
    socket.leave(data.room);
  });
});

export { app, io, server };
