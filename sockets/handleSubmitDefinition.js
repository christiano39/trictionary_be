const Definitions = require("../definitions/definitionsModel");

module.exports = handleSubmitDefinition;

function handleSubmitDefinition(io, socket, definition, lobbyCode, lobbies) {
  let numSubmitted = 0;
  let newPlayer = lobbies[lobbyCode].players.find(
    (player) => player.id === socket.id
  );

  Definitions.add(newPlayer.id, definition, lobbies[lobbyCode].roundId)
    .then(([definitionId]) => {
      console.log("Definition ID: ", definitionId);
      newPlayer = { ...newPlayer, definition, definitionId };

      lobbies[lobbyCode].players = lobbies[lobbyCode].players.map((player) => {
        if (player.definition) {
          numSubmitted++;
        }

        if (player.id === newPlayer.id) {
          return newPlayer;
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
    })
    .catch((err) => {
      console.log(err.message);
    });
}
