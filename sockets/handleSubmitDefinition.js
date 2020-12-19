module.exports = handleSubmitDefinition;

function handleSubmitDefinition(io, socket, definition, lobbyCode, lobbies) {
  lobbies[lobbyCode].players = lobbies[lobbyCode].players.map((player) => {
    if (player.id === socket.id) {
      return { ...player, definition };
    } else {
      return player;
    }
  });

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
