import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

io.on("connection", (socket) => {
  console.log("newConnection", socket.id)

  socket.on('postComment', (data) => {
    console.log(data)
    socket.broadcast.emit('postCommentServer', data)
  })

  socket.on('deleteComment', (data) => {
    console.log('Delete comment id', data)
    console.log(data)
    socket.broadcast.emit('deleteCommentServer', data)
  })

  socket.on('updateComment', (data) => {
    console.log('Update comment data ', data)
    socket.broadcast.emit('updateCommentServer', data)
  })

  socket.on('disconnect', () => {
    
  })
});


export { app, io, server}