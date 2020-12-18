module.exports = handleLobbyJoin;

function handleLobbyJoin(io, socket, username, lobbyCode) {
  socket.join(lobbyCode);
  io.to(lobbyCode).emit(
    "join lobby",
    `${username} has joined lobby ${lobbyCode}`
  );
}
