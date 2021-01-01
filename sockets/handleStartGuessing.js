module.exports = handleStartGuessing;

function handleStartGuessing(io, socket, lobbyCode, lobbies) {
  lobbies[lobbyCode] = {
    ...lobbies[lobbyCode],
    phase: "GUESSING",
  };

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
