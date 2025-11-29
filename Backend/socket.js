import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join Workspace Chat Room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    // Typing event
    socket.on("typing", (roomId) => {
      socket.to(roomId).emit("typing", socket.id);
    });

    socket.on("stop_typing", (roomId) => {
      socket.to(roomId).emit("stop_typing", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
