const Rounds = require("../rounds/roundsModel");
const Votes = require("../votes/votesModel");

module.exports = handleGuess;

function handleGuess(io, socket, lobbyCode, guess, lobbies) {
  if (guess === "0") {
    Votes.add(socket.id, parseInt(guess), lobbies[lobbyCode].roundId)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    const playerWhoVoted = lobbies[lobbyCode].players.find(
      (player) => player.id === socket.id
    );
    const playerWhoWasVotedFor = lobbies[lobbyCode].players.find(
      (player) => player.id === guess
    );

    console.log("Player who voted", playerWhoVoted);
    console.log("Player who was voted for", playerWhoWasVotedFor);

    Votes.add(
      playerWhoVoted.id,
      playerWhoWasVotedFor.definitionId,
      lobbies[lobbyCode].roundId
    )
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  }

  lobbies[lobbyCode] = {
    ...lobbies[lobbyCode],
    guesses: [...lobbies[lobbyCode].guesses, { player: socket.id, guess }],
  };

  if (lobbies[lobbyCode].players.length <= lobbies[lobbyCode].guesses.length) {
    const roundId = lobbies[lobbyCode].roundId;
    Rounds.roundFinished(roundId)
      .then(() => {
        console.log("round ended");
      })
      .catch((err) => {
        console.log(err.message);
      });

    lobbies[lobbyCode] = {
      ...lobbies[lobbyCode],
      phase: "POSTGAME",
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
