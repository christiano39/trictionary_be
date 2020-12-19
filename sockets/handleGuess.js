module.exports = handleGuess;

function handleGuess(io, socket, lobbyCode, guess, lobbies) {
  lobbies[lobbyCode] = {
    ...lobbies[lobbyCode],
    guesses: [...lobbies[lobbyCode].guesses, { player: socket.id, guess }],
  };

  if (lobbies[lobbyCode].players.length <= lobbies[lobbyCode].guesses.length) {
    lobbies[lobbyCode] = {
      ...lobbies[lobbyCode],
      completed: true,
    };
  }

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbyCode);
}
