module.exports = handlePlayAgain;

function handlePlayAgain(io, socket, lobbyCode, lobbies) {
  lobbies[lobbyCode] = {
    ...lobbies[lobbyCode],
    players: lobbies[lobbyCode].players.map((player) => {
      return {
        ...player,
        definition: "",
      };
    }),
    started: false,
    guessing: false,
    completed: false,
    word: "",
    definition: "",
    guesses: [],
  };

  io.to(lobbyCode).emit("play again", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
