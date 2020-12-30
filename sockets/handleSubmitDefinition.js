module.exports = handleSubmitDefinition;

function handleSubmitDefinition(io, socket, definition, lobbyCode, lobbies) {
  let numSubmitted = 0;

  lobbies[lobbyCode].players = lobbies[lobbyCode].players.map((player) => {
    if (player.definition) {
      numSubmitted++;
    }

    if (player.id === socket.id) {
      return { ...player, definition };
    } else {
      return player;
    }
  });

  if (numSubmitted === lobbies[lobbyCode].players.length - 1) {
    lobbies[lobbyCode] = {
      ...lobbies[lobbyCode],
      phase: "GUESSING",
    };
  }

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
