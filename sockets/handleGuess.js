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

    lobbies[lobbyCode] = calculatePoints(lobbies[lobbyCode]);
  }

  io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}

function calculatePoints(lobby) {
  lobby.guesses.forEach((guess) => {
    lobby.players.forEach((player) => {
      if (guess.guess === "0" && player.id === guess.player) {
        player.points++;
      } else if (guess.guess === player.id && guess.player !== player.id) {
        player.points++;
      }
    });
  });

  return lobby;
}
