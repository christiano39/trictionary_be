module.exports = handleLobbyJoin;

function handleLobbyJoin(io, socket, username, lobbyCode, lobbies) {
  if (lobbyCode.length != 4) {
    return;
  }

  socket.join(lobbyCode);

  if (lobbies[lobbyCode] && lobbies[lobbyCode].players) {
    lobbies[lobbyCode] = {
      ...lobbies[lobbyCode],
      players: [
        ...lobbies[lobbyCode].players,
        { id: socket.id, username, definition: "", points: 0 },
      ],
    };
  }

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
