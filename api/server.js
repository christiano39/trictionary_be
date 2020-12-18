const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const gameSocketHandler = require("../sockets");

const wordsRoutes = require("../words/wordsRoutes");

const JSON_SIZE_LIMIT = "5mb";

const server = express();

server.use(bodyParser.json({ limit: JSON_SIZE_LIMIT }));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", timestamp: Date.now() });
});

server.use("/api/words", wordsRoutes);

const app = http.createServer(server);

const io = socketIo(app, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("create lobby", (username) => {
    gameSocketHandler.handleLobbyCreate(io, socket, username);
  });

  socket.on("join lobby", (username, lobbyCode) => {
    gameSocketHandler.handleLobbyJoin(io, socket, username, lobbyCode);
  });
});

module.exports = app;
