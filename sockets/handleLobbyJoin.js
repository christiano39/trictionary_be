module.exports = handleLobbyJoin;

function handleLobbyJoin(io, socket, username, lobbyCode, lobbies) {
  socket.join(lobbyCode);

  lobbies[lobbyCode] = {
    ...lobbies[lobbyCode],
    players: [...lobbies[lobbyCode].players, { id: socket.id, username }],
  };

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
