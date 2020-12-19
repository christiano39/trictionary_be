const Words = require("../words/wordsModel");

module.exports = handleStartGame;

function handleStartGame(io, socket, lobbyCode, lobbies) {
  Words.getApprovedWords()
    .then((possibleWords) => {
      const index = Math.floor(Math.random() * possibleWords.length);
      const word = possibleWords[index];

      lobbies[lobbyCode] = {
        ...lobbies[lobbyCode],
        started: true,
        word: word.word,
        definition: word.definition,
      };

      io.to(lobbyCode).emit("game update", lobbies[lobbyCode]);

      console.log(lobbies[lobbyCode]);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
