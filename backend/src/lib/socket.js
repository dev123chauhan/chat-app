import { Server } from "socket.io";
import http from "http";
import express from "express";
export const app = express();
export const server = http.createServer(app);
const userSocketMap = {}; 

export const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },

});
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing-start", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing-start", senderId);
    }
  });

  socket.on("typing-stop", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing-stop", senderId);
    }
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("roomMessage", ({ roomId, message }) => {
    io.to(roomId).emit("roomMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId) delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
