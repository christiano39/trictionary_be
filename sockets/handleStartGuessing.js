module.exports = handleStartGuessing;

function handleStartGuessing(io, socket, lobbyCode, lobbies) {
  lobbies[lobbyCode] = {
    ...lobbies[lobbyCode],
    guessing: true,
  };

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
