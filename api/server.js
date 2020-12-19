const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const gameSocketHandler = require("../sockets");

const lobbies = {};

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

  socket.on("disconnecting", () => {
    gameSocketHandler.handleLobbyLeave(io, socket, lobbies);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });

  socket.on("create lobby", (username) => {
    gameSocketHandler.handleLobbyCreate(io, socket, username, lobbies);
  });

  socket.on("join lobby", (username, lobbyCode) => {
    gameSocketHandler.handleLobbyJoin(io, socket, username, lobbyCode, lobbies);
  });

  socket.on("start game", (lobbyCode) => {
    gameSocketHandler.handleStartGame(io, socket, lobbyCode, lobbies);
  });

  socket.on("definition submitted", (definition, lobbyCode) => {
    gameSocketHandler.handleSubmitDefinition(
      io,
      socket,
      definition,
      lobbyCode,
      lobbies
    );
  });

  socket.on("start guessing", (lobbyCode) => {
    gameSocketHandler.handleStartGuessing(io, socket, lobbyCode, lobbies);
  });

  socket.on("guess", (lobbyCode, guess) => {
    gameSocketHandler.handleGuess(io, socket, lobbyCode, guess, lobbies);
  });
});

module.exports = app;
