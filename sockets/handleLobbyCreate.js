const randomizer = require("randomatic");

module.exports = handleLobbyCreate;

function handleLobbyCreate(io, socket, username, lobbies) {
  const lobbyCode = randomizer("A", 4);
  socket.join(lobbyCode);

  lobbies[lobbyCode] = {
    lobbyCode: lobbyCode,
    players: [{ id: socket.id, username, definition: "", points: 0 }],
    host: { id: socket.id, username },
    phase: "PREGAME",
    word: "",
    definition: "",
    guesses: [],
  };

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
