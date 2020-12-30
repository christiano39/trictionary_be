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
    phase: "PREGAME",
    word: "",
    definition: "",
    guesses: [],
  };

  io.to(lobbyCode).emit("play again", lobbies[lobbyCode]);

  console.log(lobbies[lobbyCode]);
}
