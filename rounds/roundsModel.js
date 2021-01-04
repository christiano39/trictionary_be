const db = require("../data/dbConfig");

module.exports = {
  add,
  roundFinished,
};

function add(gameState, wordId) {
  const newRound = {
    word_id: wordId,
    number_players: gameState.players.length,
  };

  return db("Rounds").insert(newRound).returning("id");
}

function roundFinished(roundId) {
  return db("Rounds").where({ id: roundId }).update({ ended_at: db.fn.now() });
}
