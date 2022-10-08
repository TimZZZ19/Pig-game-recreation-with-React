//COMMENT REQUIRES
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

//COMMENT INSTANTIATIONS
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//COMMENT INVOCATIONS
app.use(cors);
server.listen(3001, () => {
  console.log("Server is running");
});
io.on("connection", (socket) => {
  socket.on("send_message", (obj) => {
    socket.broadcast.emit("receive_message", obj);
  });
});
