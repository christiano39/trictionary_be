const db = require("../data/dbConfig");

module.exports = {
  add,
};

function add(userId, definitionId, roundId) {
  let guess = definitionId ? definitionId : null;

  const newVote = { user_id: userId, definition_id: guess, round_id: roundId };

  return db("Votes").insert(newVote).returning("id");
}
