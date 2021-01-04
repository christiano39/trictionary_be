const Words = require("../words/wordsModel");
const Rounds = require("../rounds/roundsModel");

module.exports = handleStartGame;

function handleStartGame(io, socket, lobbyCode, lobbies) {
  Words.getApprovedWords()
    .then((possibleWords) => {
      const index = Math.floor(Math.random() * possibleWords.length);
      const word = possibleWords[index];

      Rounds.add(lobbies[lobbyCode], word.id)
        .then(([roundId]) => {
          lobbies[lobbyCode] = {
            ...lobbies[lobbyCode],
            phase: "WRITING",
            word: word.word,
            definition: word.definition,
            roundId,
          };

          io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

          console.log(lobbies[lobbyCode]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
