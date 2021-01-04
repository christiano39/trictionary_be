const db = require("../data/dbConfig");

module.exports = {
  add,
};

function add(userId, definition, roundId) {
  const newDefinition = {
    user_id: userId,
    definition,
    round_id: roundId,
  };

  return db("Definitions").insert(newDefinition).returning("id");
}
