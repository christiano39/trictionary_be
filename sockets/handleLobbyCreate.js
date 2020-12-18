const randomizer = require("randomatic");

module.exports = handleLobbyCreate;

function handleLobbyCreate(io, socket, username) {
  const lobbyId = randomizer("A", 4);
  socket.join(lobbyId);
  io.to(lobbyId).emit(
    "lobby created",
    `${username} has created lobby ${lobbyId}`
  );
}
