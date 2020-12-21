module.exports = handleLobbyLeave;

function handleLobbyLeave(io, socket, lobbies) {
  if (Array.from(socket.rooms).length > 1) {
    const lobbyCode = Array.from(socket.rooms)[1];

    socket.leave(lobbyCode);

    if (
      lobbies[lobbyCode] &&
      lobbies[lobbyCode].players &&
      !lobbies[lobbyCode].completed
    ) {
      lobbies[lobbyCode].players = lobbies[lobbyCode].players.filter(
        (player) => {
          if (player.id === socket.id) {
            return false;
          } else {
            return true;
          }
        }
      );
    }

    io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

    console.log(lobbies[lobbyCode]);
  }
}
